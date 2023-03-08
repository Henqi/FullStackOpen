import Blog from './Blog'
import { useEffect } from 'react'
import blogService from '../services/blogs'

const BlogList = ({ blogs, setBlogs }) => {

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  return (
    <div>
      <h2>Blogs:</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList