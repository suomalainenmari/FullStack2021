import React, { useState } from 'react'
const Blog = ( { user, blog, updateBlog, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showBlogDetails, setShowBlogDetails] = useState(false)
  const hideWhenVisible = { display: showBlogDetails ? 'none' : '' }
  const showWhenVisible = { display: showBlogDetails ? '' : 'none' }

  const handleLikeClick = (id) => {
    //console.log(`handleLikeClick funktiossa userin name on ${user.username} ja blogin kirjottaja ${blog.user.username}`)

    updateBlog(id)
  }

  const handleDeleteClick = (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog (id)
    }
  }

  //console.log(`Blog komponentissa userin name on ${user.username} ja blogin kirjottaja ${blog.user.username}`)

  return (
    <div style={blogStyle} className="defaultBlogFields">
      <p>{blog.title} {blog.author}</p>
      <div style={hideWhenVisible}>
        <button onClick={() => setShowBlogDetails(true)} id="view">view</button>
      </div>
      <div style={showWhenVisible} className="hiddenBlogFields">
        <button onClick={() => setShowBlogDetails(false)}>hide</button>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={() => handleLikeClick(blog.id)} id="like"> like</button></p>
        <p>{blog.user.name}</p>
        {user.username=== blog.user.username ?
          <button onClick={() => handleDeleteClick(blog.id)} id="delete">delete</button>
          : <div></div>}
      </div>

    </div>


  )
}

export default Blog
