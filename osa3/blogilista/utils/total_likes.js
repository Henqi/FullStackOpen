const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
    .reduce((accumulator, current) => 
      accumulator+current, 0
    )
  return likes
} 

module.exports = {
  totalLikes
}