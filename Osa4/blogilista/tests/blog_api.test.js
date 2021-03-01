const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
  console.log(helper.initialBlogs.length)
  console.log(response.body.length)
})

test('identifying field is called id', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  const id = blogsAtEnd.map(n => n.id)
  console.log(id)
  expect(id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Yritetään lisätä testissä blogia',
    author: 'Tommi Testaaja',
    url: 'http://tomminblogi.net',
    likes: 444
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

  const titles = blogsAtEnd.map(n => n.title)

  expect(titles).toContain(
    'Yritetään lisätä testissä blogia'
  )
})

test('if likes is undefined it is set to 0', async () => {
  const newBlog = {
    title: 'Yritetään lisätä blogia ilman tykkäyksiä',
    author: 'Tiina Testaaja',
    url: 'http://tiinanblogi.net'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(n => n.likes)
  console.log(likes)

  expect(likes).not.toContain(undefined)

})

test('blog without title and url is not added', async () => {
  const noTitleBlog = {
    author: 'Testi ilman otsikkoa',
    likes: 44
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  console.log(helper.initialBlogs.length)
  console.log(blogsAtEnd.length)
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
})

