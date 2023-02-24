const dummy = require('../utils/list_helper').dummy
const blog_helper = require('../utils/blog_helper')

const blogsOne = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]

const blogsOneZeroLikes = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 0,
    __v: 0
  }
]

const blogsMany = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 11,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 0,
    __v: 0
  }  
]

const blogMostLikes = {
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0
}

const blogsOneMostAuthored = {
  author: "Michael Chan",
  blogs: 1
}

const blogsManyMostAuthored = {
  author: "Robert C. Martin",
  blogs: 3,
}  

const blogsOneMostLikes = {
  author: "Michael Chan",
  likes: 7
}

const blogsManyMostLikes = {
  author: "Robert C. Martin",
  likes: 21,
}  

describe('dummy test', () => {
  
  test('dummy returns 1', () => {
    const result = dummy(blogsOne)
    expect(result).toBe(1)
  })
  
})

describe('blog likes', () => {

  test('empty blog list has 0 likes', () => {
    const blogs= []
    const result = blog_helper.totalLikes(blogs)
    expect(result).toBe(0)
  })
  
  test('amout of likes match with 1 blog (0 likes)', () => {
    const result = blog_helper.totalLikes(blogsOneZeroLikes)
    expect(result).toBe(0)
  })

  test('amout of likes match (1 blog input)', () => {
    const result = blog_helper.totalLikes(blogsOne)
    expect(result).toBe(7)
  })
  
  test('amout of likes match (many blogs input)', () => {
    const result = blog_helper.totalLikes(blogsMany)
    expect(result).toBe(45)
  })

})

describe('favourite blog', () => {
  
  test('favourite blog based on likes amount (0 blog input)', () => {
    const result = blog_helper.favouriteBlog([])
    expect(result).toEqual({})
  })

  test('favourite blog based on likes amount (1 blog input)', () => {
    const result = blog_helper.favouriteBlog(blogsOne)
    expect(result).toEqual(blogsOne[0])
  })

  test('favourite blog based on likes amount(many blogs input)', () => {
    const result = blog_helper.favouriteBlog(blogsMany)
    expect(result).toEqual(blogMostLikes)
  })

})

describe('author with most blogs', () => {

  test('author with most blogs (0 blogs input)', () => {
    const result = blog_helper.mostBlogs([])
    expect(result).toEqual({})
  })
  
  test('author with most blogs (1 blog input)', () => {
    const result = blog_helper.mostBlogs(blogsOne)
    expect(result).toEqual(blogsOneMostAuthored)
  })

  test('author with most blogs (many blogs input)', () => {
    const result = blog_helper.mostBlogs(blogsMany)
    expect(result).toEqual(blogsManyMostAuthored)
  })

})

describe('author with most likes', () => {

  test('author with most likes (0 blogs input)', () => {
    const result = blog_helper.mostLikes([])
    expect(result).toEqual({})
  })
  
  test('author with most likes (1 blog input)', () => {
    const result = blog_helper.mostLikes(blogsOne)
    expect(result).toEqual(blogsOneMostLikes)
  })

  test('author with most likes (many blogs input)', () => {
    const result = blog_helper.mostLikes(blogsMany)
    expect(result).toEqual(blogsManyMostLikes)
  })

})