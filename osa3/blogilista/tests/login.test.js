const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testData = require('./test_data')

beforeEach(async () => {
  await mongoose.connect(MONGODB_URI)
  await User.deleteMany({})

  for (let i = 0; i < testData.usersMany.length; i++) {
    await api.post('/api/users').send(testData.usersMany[i])
  }

})

const usersInDb = async () => {
  const users = await api.get('/api/users')
  return users
}

describe('Login tests', () => {

  test('login with existing user is successful & returns token', async () => {
    const response = await api.post('/api/login')
      .send(testData.usersMany[0])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body)
      .toEqual(
        expect.objectContaining({ 'token': expect.any(String) })
      )
  })

  test('login with non-existing user unsuccessful', async () => {
    await api.post('/api/login')
      .send(testData.usersOneNew)
      .expect(401)
  })

  test('login with existing user & wrong password unsuccessful', async () => {
    await api.post('/api/login')
      .send(testData.usersOneWrongPw)
      .expect(401)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})