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
    "likes": 7,
    "user":"63fdceb278b24b2a7a21786d"
  },
  {
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 5,
    "user":"63fdceb278b24b2a7a21786d"
  },
  {
    "title": "Canonical string reduction",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    "likes": 12,
    "user":"63fdceb278b24b2a7a21786d"
  },
  {
    "title": "First class tests",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    "likes": 10,
    "user":"63fdceb278b24b2a7a21786d"
  },
  {
    "title": "TDD harms architecture",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    "likes": 11,
    "user":"63fdceb278b24b2a7a21786d"
  },
  {
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 0,
    "user":"63fdceb278b24b2a7a21786d"
  }
]

const blogMostLikes = blogsMany[2]

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

const usersMany = [
  {
    "username": "Tupu",
    "name": "Tupu Ankka",
    "password": "kaak",
    "blogs": []
  },
  {
    "username": "Hupu",
    "name": "Hupu Ankka",
    "password": "kook",
    "blogs": []
  },
  {
    "username": "Lupu",
    "name": "Lupu Ankka",
    "password": "kiik",
    "blogs": []
  }
]

const usersOneWrongPw =   {
  "username": "Tupu",
  "name": "Tupu Ankka",
  "password": "wrongPassword",
  "blogs": []
}

const usersOneNew = {
  "username": "Aku",
  "name": "Aku Ankka",
  "password": "kvak kvak"
}

const usersOneNewShortUsername = {
  "username": "Ak",
  "name": "Aku Ankka",
  "password": "kvak kvak"
}

const usersOneNewShortPw = {
  "username": "Aku",
  "name": "Aku Ankka",
  "password": "kv"
}

const usersOneNewNoUsername = {
  "name": "Aku Ankka",
  "password": "kvak kvak"
}

const usersOneNewNoPw = {
  "username": "Aku",
  "name": "Aku Ankka",
}

const usersOneWithBlogs = {
  "username": "Anri",
  "name": "Henri P",
  "blogs": [
    {
      "title": "Irelia how-to",
      "author": "Pekka Puupää",
      "url": "https://ireliacarriesu/",
      "likes": 12,
      "user": "63fdceb278b24b2a7a21786d",
      "id": "63fe1966393240ef48b9d5ac"
    },
    {
      "title": "splitpush",
      "author": "broken bones",
      "url": "https://example.com",
      "likes": 2,
      "user": "63fdceb278b24b2a7a21786d",
      "id": "63fe19ad393240ef48b9d5b4"
    }
  ]
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
  blogsManyMostLikes,
  usersMany,
  usersOneWrongPw,
  usersOneNew,
  usersOneNewShortPw,
  usersOneNewShortUsername,
  usersOneNewNoUsername,
  usersOneNewNoPw,
  usersOneWithBlogs
}