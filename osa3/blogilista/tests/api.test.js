const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const testData = require('./test_data')

beforeEach(async () => {
  await mongoose.connect(MONGODB_URI)
  await Blog.deleteMany({})
  await User.deleteMany({})
  await Blog.insertMany(testData.blogsMany)

  for (let i = 0; i < testData.usersMany.length; i++) {
    await api.post('/api/users').send(testData.usersMany[i])
  }
})

const blogsInDb = async () => {
  const blogs = await api.get('/api/blogs')
  return blogs
}

const getTestToken = async (userIndex) => {
  const user = testData.usersMany[userIndex]
  const login = await api.post('/api/login')
    .send(user)
  return `Bearer ${login.body.token}`
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
    expect(response.body).toHaveLength(testData.blogsMany.length)
  })

  test('the key property of the blog is named "id"', async () => {
    const response = await blogsInDb()
    expect(response.body[0].id).toBeDefined()
  })

  test('blog cannot be added without token, respond with http 401', async () => {
    const startState = await blogsInDb()
    expect(startState.body).toHaveLength(testData.blogsMany.length)

    await api.post('/api/blogs')
      .send(testData.blogsOneNew)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('blog can be added with valid token', async () => {
    const startState = await blogsInDb()
    expect(startState.body).toHaveLength(testData.blogsMany.length)

    await api.post('/api/blogs')
      .send(testData.blogsOneNew)
      .set('Authorization', await getTestToken(0))
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await blogsInDb()
    expect(response.body).toHaveLength(testData.blogsMany.length+1)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          testData.blogsOneNew
        )
      ])
    )
  })

  test('if "likes" property is undefined, set likes to 0', async () => {
    const blogNoLikes = { ...testData.blogsOneNew }
    delete blogNoLikes.likes

    const response = await api.post('/api/blogs')
      .send(blogNoLikes)
      .set('Authorization', await getTestToken(0))
    expect(response.body.likes).toBe(0)
  })

  test('if title field is empty respond with http 400', async () => {
    const blogNoLikes = { ...testData.blogsOneNew }
    delete blogNoLikes.title

    await api.post('/api/blogs')
      .send(blogNoLikes)
      .set('Authorization', await getTestToken(0))
      .expect(400)
  })

  test('if url field is empty respond with http 400', async () => {
    const blogNoLikes = { ...testData.blogsOneNew }
    delete blogNoLikes.url

    await api.post('/api/blogs')
      .send(blogNoLikes)
      .set('Authorization', await getTestToken(0))
      .expect(400)
  })

  test('creator can delete blog by id', async () => {
    const users = await api.get('/api/users')
    const newBlog = { ...testData.blogsOneNew }
    user = users.body[0]

    const postedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', await getTestToken(0))
      .expect(201)

    await api.delete(`/api/blogs/${postedBlog.body.id}`)
      .set('Authorization', await getTestToken(0))
      .expect(204)

    const endState = await blogsInDb()
    expect(endState.body).toHaveLength(testData.blogsMany.length)
    expect(endState.body).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { author: newBlog.author,
            likes: newBlog.likes,
            title: newBlog.title,
            url: newBlog.url,
            user: { id: user.id, name:user.name, username: user.username }
          }
        )
      ])
    )
  })

  test('other user cannot delete blog by id, respond with http 401', async () => {
    const users = await api.get('/api/users')
    const newBlog = { ...testData.blogsOneNew }
    user = users.body[0]

    const postedBlog = await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', await getTestToken(0))
      .expect(201)

    await api.delete(`/api/blogs/${postedBlog.body.id}`)
      .set('Authorization', await getTestToken(1))
      .expect(401)

    const endState = await blogsInDb()
    expect(endState.body).toHaveLength(testData.blogsMany.length+1)
    expect(endState.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { author: newBlog.author,
            likes: newBlog.likes,
            title: newBlog.title,
            url: newBlog.url,
            user: { id: user.id, name:user.name, username: user.username }
          }
        )
      ])
    )
  })

  // needs to be refactored to use jwt auth
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