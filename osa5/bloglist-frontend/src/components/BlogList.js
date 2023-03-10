import Blog from './Blog'
import { useEffect } from 'react'
import blogService from '../services/blogs'
import { orderBy } from 'lodash'
import PropTypes from 'prop-types'

const BlogList = ({
  blogs,
  setBlogs,
  user,
  setSuccessMessage,
  setErrorMessage }) => {

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <h2>Blogs:</h2>
      {orderBy(blogs, 'likes', 'desc').map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default BlogList