import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({
  blog,
  user,
  blogs,
  setBlogs,
  setSuccessMessage }) => {

  const [showFull, setShowFull] = useState(false)

  const toggleViewBlog = () => {
    setShowFull(!showFull)
  }

  const handleAddLike = async () => {
    const updatedBlog = { ...blog }
    updatedBlog.likes += 1
    updatedBlog.user = user.id

    const blogLikesAdded = await blogService.updateBlog(updatedBlog, user, blog.id)
    const blogsWithoutOld = blogs.filter(blogEntry => blogEntry.id !== blog.id)
    setBlogs(blogsWithoutOld.concat(blogLikesAdded))
  }

  const isUserBlog = () => {
    if (blog.user.username.toString() === user.username.toString()) {
      return true
    } else {
      return false
    }
  }

  const deleteButtonStyle = { display: isUserBlog() ? '' : 'none' }

  const handleBlogDelete = async () => {
    if (window.confirm(`Delete blog "${blog.title}" by "${blog.author}"?`)) {
      await blogService.deleteBlog(user, blog.id)
      setBlogs(blogs.filter(blogEntry => blogEntry.id !== blog.id))
      setSuccessMessage(`Deleted blog "${blog.title}" by "${blog.author}"`)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  if (showFull) {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        <button onClick={toggleViewBlog}>
          hide
        </button>
        <br/>
        {blog.url}
        <br/>
        likes: {blog.likes}
        <button onClick={handleAddLike}>
          like
        </button>
        <br/>
        {blog.user.name}
        <div>
          <button onClick={handleBlogDelete} style={deleteButtonStyle} >
            delete blog
          </button>
        </div>
      </div>
    )
  }

  else {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        <button onClick={toggleViewBlog}>
          view
        </button>
      </div>
    )
  }
}

export default Blog