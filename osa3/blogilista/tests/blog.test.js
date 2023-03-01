const dummy = require('../utils/list_helper').dummy
const blogHelper = require('../utils/blog_helper')
const testHelper = require('./test_helper')

describe('dummy test', () => {

  test('dummy returns 1', () => {
    const result = dummy(testHelper.blogsOne)
    expect(result).toBe(1)
  })

})

describe('blog likes', () => {

  test('empty blog list has 0 likes', () => {
    const blogs = []
    const result = blogHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('amout of likes match with 1 blog (0 likes)', () => {
    const result = blogHelper.totalLikes(testHelper.blogsOneZeroLikes)
    expect(result).toBe(0)
  })

  test('amout of likes match (1 blog input)', () => {
    const result = blogHelper.totalLikes(testHelper.blogsOne)
    expect(result).toBe(7)
  })

  test('amout of likes match (many blogs input)', () => {
    const result = blogHelper.totalLikes(testHelper.blogsMany)
    expect(result).toBe(45)
  })

})

describe('favourite blog', () => {

  test('favourite blog based on likes amount (0 blog input)', () => {
    const result = blogHelper.favouriteBlog([])
    expect(result).toEqual({})
  })

  test('favourite blog based on likes amount (1 blog input)', () => {
    const result = blogHelper.favouriteBlog(testHelper.blogsOne)
    expect(result).toEqual(testHelper.blogsOne[0])
  })

  test('favourite blog based on likes amount(many blogs input)', () => {
    const result = blogHelper.favouriteBlog(testHelper.blogsMany)
    expect(result).toEqual(testHelper.blogMostLikes)
  })

})

describe('author with most blogs', () => {

  test('author with most blogs (0 blogs input)', () => {
    const result = blogHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('author with most blogs (1 blog input)', () => {
    const result = blogHelper.mostBlogs(testHelper.blogsOne)
    expect(result).toEqual(testHelper.blogsOneMostAuthored)
  })

  test('author with most blogs (many blogs input)', () => {
    const result = blogHelper.mostBlogs(testHelper.blogsMany)
    expect(result).toEqual(testHelper.blogsManyMostAuthored)
  })

})

describe('author with most likes', () => {

  test('author with most likes (0 blogs input)', () => {
    const result = blogHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('author with most likes (1 blog input)', () => {
    const result = blogHelper.mostLikes(testHelper.blogsOne)
    expect(result).toEqual(testHelper.blogsOneMostLikes)
  })

  test('author with most likes (many blogs input)', () => {
    const result = blogHelper.mostLikes(testHelper.blogsMany)
    expect(result).toEqual(testHelper.blogsManyMostLikes)
  })

})