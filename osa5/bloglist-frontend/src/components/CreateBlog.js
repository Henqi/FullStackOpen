import blogService from '../services/blogs'

const CreateBlog = ({ setBlogs, title, setTitle, author, setAuthor, url, setUrl, user }) => {
    
    const handleBlogCreate = async (event) => {
        event.preventDefault()
        const newBlog = {
            'title': title,
            'author': author,
            'url': url 
        }      
        await blogService.createBlog(newBlog, user)
        const updatedBlogs = await blogService.getAll()
        setBlogs(updatedBlogs)
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
        <button type="submit">create blog</button>
        </form>      
    </>
  )
}

export default CreateBlog