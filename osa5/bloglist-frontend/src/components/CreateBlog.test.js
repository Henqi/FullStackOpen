import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import blogService from '../services/blogs'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'


describe('Frontend blog creation tests', () => {

  const user = {
    name: 'Henri',
    token: 'pajatso',
    username: 'IsoH'
  }

  const blog = {
    author: 'Pate',
    title: 'Teaching Finnish',
    url: 'opeton.com'
  }

  const mockHandler = jest.fn()
  const mockRef = { current: null }
  const testUser = userEvent.setup()

  const blogs = []
  const setBlogs = mockHandler
  const setSuccessMessage = mockHandler
  const setErrorMessage = mockHandler

  test('when creating new blog, call the right handler with the right input', async () => {
    render(
      <Togglable buttonLabel='testbutton' ref={mockRef} >
        <CreateBlog blogs={blogs} setBlogs={setBlogs} user={user} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} createBlogRef={mockRef} />
      </Togglable>
    )

    const spyCreateBlog = jest.spyOn(blogService, 'createBlog').mockImplementation(() => {})
    const spyGetAll = jest.spyOn(blogService, 'getAll').mockImplementation(() => {})

    const titleInput = screen.getByPlaceholderText('Write the title here')
    const authorInput = screen.getByPlaceholderText('Write the author here')
    const urlInput = screen.getByPlaceholderText('Write the url here')

    await testUser.type(titleInput, blog.title)
    await testUser.type(authorInput, blog.author)
    await testUser.type(urlInput, blog.url)

    expect(titleInput).toHaveValue(blog.title)
    expect(authorInput).toHaveValue(blog.author)
    expect(urlInput).toHaveValue(blog.url)

    const submitButton = screen.getByText('Add blog')
    await testUser.click(submitButton)

    expect(titleInput).toHaveValue('')
    expect(authorInput).toHaveValue('')
    expect(urlInput).toHaveValue('')

    expect(spyCreateBlog).toBeCalledTimes(1)
    expect(spyCreateBlog).toBeCalledWith(blog, user)
    expect(spyGetAll).toBeCalledTimes(1)
  })

})

afterEach(async () => {
  jest.restoreAllMocks()
})