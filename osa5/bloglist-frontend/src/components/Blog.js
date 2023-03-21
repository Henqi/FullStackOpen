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
      <div className='blog' style={blogStyle}>
        <div className='blog-title-author-full' >
          {blog.title} - {blog.author}
          <button className='blog-hide' onClick={toggleViewBlog}>
            hide
          </button>
        </div>
        <div className='blog-url'>
          {blog.url}
        </div>
        <div className='blog-likes'>
        likes: {blog.likes}
          <button className='blog-add-like' onClick={handleAddLike}>
          like
          </button>
        </div>
        <div className='blog-user'>
          {blog.user.name}
        </div>
        <div>
          <button className='blog-delete' onClick={handleBlogDelete} style={deleteButtonStyle} >
            delete blog
          </button>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title} - {blog.author}
        <button className='blog-view' onClick={toggleViewBlog}>
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