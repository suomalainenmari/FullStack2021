import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a,b) => b.likes-a.likes))
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort((a,b) => b.likes - a.likes))
      })

  }

  const deleteBlog = (id) => {
    try {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id).sort((a,b) => b.likes-a.likes))
        })
      setErrorMessage('The blog has been deleted')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('The blog could not be deleted')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const updateBlog = (id) => {
    try {
      const blog= blogs.find(n => n.id===id)
      console.log('Blogi ennen tykkäystä')
      console.log(blog)
      const likedBlog= { ...blog, likes: blog.likes+1 }
      blogService
        .addLikeToBlog(id, likedBlog)
        .then(returnedBlog => {
          returnedBlog.user = blog.user
          console.log(`palautetun blogin tykkäykset on ${returnedBlog.likes}`)
          setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a,b) => b.likes-a.likes))
        })
      setErrorMessage(`a new blog ${likedBlog.title} by ${likedBlog.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Could not like the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )



  const blogForm = () => (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )



  const displayedBlogs = () => (
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}

        />)}

    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          {displayedBlogs()}
        </div>}
    </div>

  )
}

export default App