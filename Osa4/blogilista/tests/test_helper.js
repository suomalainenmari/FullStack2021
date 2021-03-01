const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testiblogi',
    author: 'Mari Suo',
    url: 'http://marinblogi.net',
    likes: 51
  },
  {
    title: 'Testiblogeista toinen',
    author: 'Elli Suo',
    url: 'http://ellinblogi.net',
    likes: 514
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
  {
    username: 'Elli',
    password: 'Elli'
  },
  { 
    username: 'Minja',
    password: 'Minja'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}



module.exports= {
  initialBlogs, blogsInDb, initialUsers, usersInDb
}