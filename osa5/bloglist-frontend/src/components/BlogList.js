import Blog from './Blog'
import { useEffect } from 'react'
import blogService from '../services/blogs'
import { orderBy } from 'lodash';

const BlogList = ({ blogs, setBlogs, user }) => {

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
          user={user} />
      )}
    </div>
  )
}

export default BlogList