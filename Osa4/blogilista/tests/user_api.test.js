const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('Users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all usres are returned', async () => {
  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(helper.initialUsers.length)
  console.log(helper.initialUsers.length)
  console.log(response.body.length)
})

test('password has to be defined', async () => {
  const usersAtEnd = await helper.usersInDb()
  const password = usersAtEnd.map(n => n.password)
  console.log(password)
  expect(password).toBeDefined()
})

test('unvalid users are not added', async () => {
  const newUser = {
    username: 'mari'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    
  const usersAtEnd = await helper.usersInDb()
  console.log(helper.initialUsers.length)
  console.log(usersAtEnd.length)
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})

afterAll(() => {
  mongoose.connection.close()
})
