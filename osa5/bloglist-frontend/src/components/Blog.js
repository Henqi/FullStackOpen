import { useState } from "react"

const Blog = ({ blog }) => {

  const [showFull, setShowFull] = useState(false)

  const toggleViewBlog = () => {
    setShowFull(!showFull)
  }

  const handleAddLike = () => {

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
      </div>
    )
  }

  else {
    return (
      <div className='blogStyle' style={blogStyle}>
        {blog.title} - {blog.author}
        <button onClick={toggleViewBlog}>
          view
        </button>
      </div>
    )
  }
}

export default Blog