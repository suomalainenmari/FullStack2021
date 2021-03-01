const jwt = require('jsonwebtoken')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())

})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({error: 'token missing or invalid'})
  } 
  
  const user = await User.findById(decodedToken.id)
  if (blog.user.toString()!==user._id.toString()) {
    return response.status(401).json({ error: 'You cannot delete blogs that arent yours'})
  }
  else {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request,response)=> {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(savedBlog.toJSON())
})

module.exports= blogsRouter