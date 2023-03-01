const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testHelper = require('./test_helper')

beforeEach(async () => {
  await mongoose.connect(MONGODB_URI)
  await User.deleteMany({})

  for (let i = 0; i < testHelper.usersMany.length; i++) {
    await api.post('/api/users').send(testHelper.usersMany[i])
  }

})

const usersInDb = async () => {
  const users = await api.get('/api/users')
  return users
}

describe('Login tests', () => {

  test('login with existing user successful', async () => {
    await api.post('/api/login')
      .send(testHelper.usersMany[0])
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('login with non-existing user unsuccessful', async () => {
    await api.post('/api/login')
      .send(testHelper.usersOneNew)
      .expect(401)
  })

  test('login with existing user & wrong password unsuccessful', async () => {
    await api.post('/api/login')
      .send(testHelper.usersOneWrongPw)
      .expect(401)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})