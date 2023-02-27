const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('../tests/test_helper')


describe('API tests', () => {

  test('the blogs are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('the correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')    
    expect(response.body).toHaveLength(testHelper.blogsMany.length)
  })

})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.blogsMany)
})

afterAll(async () => {
  await mongoose.connection.close()
})