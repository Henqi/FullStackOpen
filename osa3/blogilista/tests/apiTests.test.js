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

  test('the key property of the blog is named "id"', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined() 
  })
  
  test('blogs can be added', async () => {
    const startState = await api.get('/api/blogs')
    expect(startState.body).toHaveLength(testHelper.blogsMany.length)
    
    await api.post('/api/blogs')
      .send(testHelper.blogsOneNew)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs') 
    expect(response.body).toHaveLength(testHelper.blogsMany.length+1)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          testHelper.blogsOneNew
        )
      ])
    )
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.blogsMany)
})

afterAll(async () => {
  await mongoose.connection.close()
})