import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  user,
  blogs,
  setBlogs,
  setSuccessMessage,
  setErrorMessage }) => {

  const [showFull, setShowFull] = useState(false)

  const toggleViewBlog = () => {
    setShowFull(!showFull)
  }

  const handleAddLike = async () => {
    const updatedBlog = { ...blog }
    updatedBlog.likes += 1
    updatedBlog.user = user.id

    try {
      const blogLikesAdded = await blogService.updateBlog(updatedBlog, user, blog.id)
      const blogsWithoutOld = blogs.filter(blogEntry => blogEntry.id !== blog.id)
      setBlogs(blogsWithoutOld.concat(blogLikesAdded))
    }
    catch (e) {
      setErrorMessage(`Could not add like: ${e.response.data.error}`)
    }
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
      try {
        await blogService.deleteBlog(user, blog.id)
        setBlogs(blogs.filter(blogEntry => blogEntry.id !== blog.id))
        setSuccessMessage(`Deleted blog "${blog.title}" by "${blog.author}"`)
      }
      catch (e) {
        setErrorMessage(`Could not delete blog: ${e.response.data.error}`)
      }
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
        <div>
          {blog.title} - {blog.author}
          <button id='blog-hide' onClick={toggleViewBlog}>
            hide
          </button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
        likes: {blog.likes}
          <button id='blog-add-like' onClick={handleAddLike}>
          like
          </button>
        </div>
        <div id='blog-user'>
          {blog.user.name}
        </div>
        <div>
          <button id='blog-delete' onClick={handleBlogDelete} style={deleteButtonStyle} >
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
        <button id='blog-view' onClick={toggleViewBlog}>
          view
        </button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired
}

export default Blog