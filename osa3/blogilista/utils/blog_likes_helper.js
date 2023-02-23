const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    .reduce((accumulator, current) => 
      accumulator+current, 0
    )
  return likes
} 

const favouriteBlog = (blogs) => {
  const mostLikes = blogs.reduce(
    (prev, current) => {
      return prev.likes > current.likes ? prev : current
    })
  return mostLikes
}

module.exports = {
  totalLikes,
  favouriteBlog
}