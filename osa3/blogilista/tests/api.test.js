const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

beforeEach(async () => {
  await mongoose.connection.close()
  await mongoose.connect(MONGODB_URI)
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.blogsMany)
})

const blogsInDb = async () => {
  const blogs = await api.get('/api/blogs')
  return blogs
}

describe('API tests', () => {

  test('the blogs are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the correct number of blogs are returned', async () => {
    const response = await blogsInDb()
    expect(response.body).toHaveLength(testHelper.blogsMany.length)
  })

  test('the key property of the blog is named "id"', async () => {
    const response = await blogsInDb()
    expect(response.body[0].id).toBeDefined()
  })

  test('blogs can be added', async () => {
    const startState = await blogsInDb()
    expect(startState.body).toHaveLength(testHelper.blogsMany.length)

    await api.post('/api/blogs')
      .send(testHelper.blogsOneNew)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await blogsInDb()
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
    const blogNoLikes = { ...testHelper.blogsOneNew }
    delete blogNoLikes.likes
    const response = await api.post('/api/blogs')
      .send(blogNoLikes)
    expect(response.body.likes).toBe(0)
  })

  test('if title field is empty respond with http 400', async () => {
    const blogNoLikes = { ...testHelper.blogsOneNew }
    delete blogNoLikes.title

    await api.post('/api/blogs')
      .send(blogNoLikes)
      .expect(400)
  })

  test('if url field is empty respond with http 400', async () => {
    const blogNoLikes = { ...testHelper.blogsOneNew }
    delete blogNoLikes.url

    await api.post('/api/blogs')
      .send(blogNoLikes)
      .expect(400)
  })

  test('blogs can be deleted by id property', async () => {
    const startState = await blogsInDb()
    await api.delete(`/api/blogs/${startState.body[0].id}`)
      .expect(204)

    const endState = await blogsInDb()
    expect(endState.body).toHaveLength(testHelper.blogsMany.length-1)
    expect(endState.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          startState.body[0]
        )
      ])
    )
  })

  test('blogs can be modified with PUT according to id property', async () => {
    const startState = await blogsInDb()
    const firstBlogId = startState.body[0].id
    await api.put(`/api/blogs/${firstBlogId}`)
      .send({ likes:420 })

    const endState = await blogsInDb()
    const firstBlogIndex = endState.body.findIndex(obj => obj.id === firstBlogId)
    expect(endState.body[firstBlogIndex].likes).toEqual(420)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})