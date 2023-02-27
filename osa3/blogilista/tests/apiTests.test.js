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

  test('if "likes" property is undefined, set likes to 0', async () => {
    let blogNoLikes = testHelper.blogsOneNew
    blogNoLikes.likes = undefined
    const response = await api.post('/api/blogs')
      .send(blogNoLikes)
    expect(response.body.likes).toBe(0) 
  })

  test('if title or url fields are empty respond with http 400', async () => {
    let blogNoLikes = testHelper.blogsOneNew
    blogNoLikes.title = undefined
    blogNoLikes.url = undefined

    await api.post('/api/blogs')
      .send(blogNoLikes)
      .expect(400) 
  })

  test('blogs can be deleted by id property', async () => {
    const startState = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${startState.body[0].id}`)
      .expect(204)

    const endState = await api.get('/api/blogs') 
    expect(endState.body).toHaveLength(testHelper.blogsMany.length-1)
    expect(endState.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          startState.body[0]
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