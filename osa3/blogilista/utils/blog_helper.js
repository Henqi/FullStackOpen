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

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs
}