const Blog = require('../models/blog')

const blogsOne = [
  {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 7
  }
]

const blogsOneZeroLikes = [
  {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 0
  }
]

const blogsOneNew = {
  "title": "New blog on newn subject",
  "author": "Henri Kuilu",
  "url": "https://kuilu.com/",
  "likes": 2
}

const blogsMany = [
  {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": 7
  },
  {
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 5
  },
  {
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 12
  },
  {
    "title": "First class tests",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    "likes": 10
  },
  {
    "title": "TDD harms architecture",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    "likes": 11
  },
  {
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 0
  }
]

const blogMostLikes = {
  "title": "Canonical string reduction",
  "author": "Edsger W. Dijkstra",
  "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  "likes": 12
}

const blogsOneMostAuthored = {
  "author": "Michael Chan",
  "blogs": 1
}

const blogsManyMostAuthored = {
  "author": "Robert C. Martin",
  "blogs": 3,
}

const blogsOneMostLikes = {
  "author": "Michael Chan",
  "likes": 7
}

const blogsManyMostLikes = {
  "author": "Robert C. Martin",
  "likes": 21,
}


module.exports = {
  blogsOne,
  blogsOneZeroLikes,
  blogsOneNew,
  blogsMany,
  blogMostLikes,
  blogsOneMostAuthored,
  blogsManyMostAuthored,
  blogsOneMostLikes,
  blogsManyMostLikes
}