import blogService from '../services/blogs'

const CreateBlog = ({
  setBlogs,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  user,
  setSuccessMessage,
  setErrorMessage }) => {

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
      setSuccessMessage(`Blog "${newBlog.title}" by "${newBlog.author}" succesfully created`)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setErrorMessage(`Could not create new blog`)
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
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br></br>
        <button type="submit">Add blog</button>
      </form>
    </>
  )
}

export default CreateBlog