const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const testHelper = require('../tests/test_helper')

beforeEach(async () => {
  await mongoose.connection.close()
  await mongoose.connect(MONGODB_URI)
  await User.deleteMany({})
  await User.insertMany(testHelper.usersMany) // dummy passwordHashes
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
    expect(response.body).toHaveLength(testHelper.usersMany.length)
  })

  test('new users with unique username can be added', async () => {
    const startState = await usersInDb()
    expect(startState.body).toHaveLength(testHelper.usersMany.length)

    await api.post('/api/users')
      .send(testHelper.usersOneNew)
      .expect(201)

    const userwithoutPw = { ...testHelper.usersOneNew }
    delete userwithoutPw.password

    const response = await usersInDb()
    expect(response.body).toHaveLength(testHelper.usersMany.length+1)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          userwithoutPw
        )
      ])
    )
  })

  test('if username is duplicate, return error', async () => {
    const user = testHelper.usersOneNew
    await api.post('/api/users')
      .send(user)
      .expect(201)

    await api.post('/api/users')
      .send(user)
      .expect(400)
  })

  test('if username is undefined, return error', async () => {
    await api.post('/api/users')
      .send(testHelper.usersOneNewNoUsername)
      .expect(400)
  })

  test('if password is undefined, return error', async () => {
    await api.post('/api/users')
      .send(testHelper.usersOneNewNoPw)
    expect(400)
  })

  test('if username is shorter than 3 characters, return error', async () => {
    await api.post('/api/users')
      .send(testHelper.usersOneNewShortUsername)
      .expect(400)
  })

  test('if password is shorter than 3 characters, return error', async () => {
    await api.post('/api/users')
      .send(testHelper.usersOneNewShortPw)
      .expect(400)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})