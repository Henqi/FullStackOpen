import { useEffect, useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {

  const [showFull, setShowFull] = useState(false)
  const [upToDateBlog, setUpToDateBlog] = useState([])

  useEffect(() => {
    setUpToDateBlog(blog)
  }, [])


  const toggleViewBlog = () => {
    setShowFull(!showFull)
  }

  const handleAddLike = async () => {
    const updatedBlog = { ...upToDateBlog }
    updatedBlog.likes += 1
    updatedBlog.user = user.id
    const response = await blogService.updateBlog(updatedBlog, user, upToDateBlog.id)
    setUpToDateBlog(response)
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
      <div className='blogStyle' style={blogStyle}>
        {upToDateBlog.title} - {upToDateBlog.author}
        <button onClick={toggleViewBlog}>
          hide
        </button>
        <br/>
        {upToDateBlog.url}
        <br/>
        likes: {upToDateBlog.likes}
        <button onClick={handleAddLike}>
          like
        </button>
        <br/>
        {upToDateBlog.user.name}
      </div>
    )
  }

  else {
    return (
      <div className='blogStyle' style={blogStyle}>
        {upToDateBlog.title} - {upToDateBlog.author}
        <button onClick={toggleViewBlog}>
          view
        </button>
      </div>
    )
  }
}

export default Blog