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

describe('User tests', () => {

  test('GET returns users as JSON', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the correct number of users are returned', async () => {
    const response = await usersInDb()
    expect(response.body).toHaveLength(testData.usersMany.length)
  })

  test('new users with unique username can be added', async () => {
    const startState = await usersInDb()
    expect(startState.body).toHaveLength(testData.usersMany.length)

    await api.post('/api/users')
      .send(testData.usersOneNew)
      .expect(201)

    const userwithoutPw = { ...testData.usersOneNew }
    delete userwithoutPw.password

    const response = await usersInDb()
    expect(response.body).toHaveLength(testData.usersMany.length+1)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          userwithoutPw
        )
      ])
    )
  })

  test('if username is duplicate, return error', async () => {
    const user = testData.usersOneNew
    await api.post('/api/users')
      .send(user)
      .expect(201)

    await api.post('/api/users')
      .send(user)
      .expect(400)
  })

  test('if username is undefined, return error', async () => {
    await api.post('/api/users')
      .send(testData.usersOneNewNoUsername)
      .expect(400)
  })

  test('if password is undefined, return error', async () => {
    await api.post('/api/users')
      .send(testData.usersOneNewNoPw)
    expect(400)
  })

  test('if username is shorter than 3 characters, return error', async () => {
    await api.post('/api/users')
      .send(testData.usersOneNewShortUsername)
      .expect(400)
  })

  test('if password is shorter than 3 characters, return error', async () => {
    await api.post('/api/users')
      .send(testData.usersOneNewShortPw)
      .expect(400)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})