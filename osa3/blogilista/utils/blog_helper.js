const _ = require('lodash')

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    .reduce((accumulator, current) => 
      accumulator+current, 0
    )
  return likes
} 

const favouriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return {}
  }
  const mostLikes = blogs.reduce(
    (prev, current) => {
      return prev.likes > current.likes ? prev : current
    })
  return mostLikes
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return {}
  }
  const mostBlogsAuthor = blogs
    .map(blog => blog.author)
    .sort()
    .pop()

  const authorBlogsAmount = blogs.filter(blog => blog.author === mostBlogsAuthor).length
  
  return {
    author: mostBlogsAuthor,
    blogs: authorBlogsAmount
  }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return {}
  }
  const authorsSorted = _.groupBy(blogs, blog => blog.author)
  const authorKeys = _.keysIn(authorsSorted)
  const likesPerAuthor = authorKeys.map(key => authorsSorted[key])
  const sumOfLikes = likesPerAuthor.map(blogs => blogs.map(blog => blog.likes))
    .map(likes => likes.reduce((acc, curr) => acc+curr))
  const maxLikesIndex = sumOfLikes.indexOf(_.max(sumOfLikes)) 

  return {
    author: authorKeys[maxLikesIndex],
    likes: sumOfLikes[maxLikesIndex]
  }
}

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}