import blogService from '../services/blogs'
import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({
  setBlogs,
  user,
  setSuccessMessage,
  setErrorMessage,
  createBlogRef }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      'title': title,
      'author': author,
      'url': url
    }

    try {
      await blogService.createBlog(newBlog, user)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      createBlogRef.current.toggleVisibility()

      setSuccessMessage(`Blog "${newBlog.title}" by "${newBlog.author}" succesfully created`)
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (e) {
      setErrorMessage(`Could not create new blog: ${e.response.data.error}`)
    }
  }

  return (
    <>
      <h2>Add new blog:</h2>
      <form onSubmit={handleBlogCreate}>
        <div>
            title
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='Write the title here'
          />
        </div>
        <div>
            author
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='Write the author here'
          />
        </div>
        <div>
            url
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='Write the url here'
          />
        </div>
        <br></br>
        <button id="submit-add-blog" type="submit">Add blog</button>
      </form>
    </>
  )
}

CreateBlog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired
}

export default CreateBlog