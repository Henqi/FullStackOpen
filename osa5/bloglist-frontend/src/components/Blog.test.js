import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'


describe('Frontend blog tests', () => {

  const user = {
    name: 'Henri',
    token: 'pajatso',
    username: 'IsoH'
  }

  const blog = {
    author: 'Pate',
    title: 'Teaching Finnish',
    url: 'opeton.com',
    user: user,
    likes: 1332
  }

  const mockHandler = jest.fn()
  const clickUser = userEvent.setup()

  const blogs = []
  const setBlogs = mockHandler
  const setSuccessMessage = mockHandler

  test('blog renders only title & author by default', async () => {
    render(<Blog blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} />)
    screen.getByText(`${blog.title} - ${blog.author}`)
  })

  test('url, likes & user is rendered after user clicks "view" button', async () => {
    render(<Blog blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} />)
    const button = screen.getByText('view')
    await clickUser.click(button)

    screen.getByText(`${blog.title} - ${blog.author}`)
    screen.getByText(`${blog.url}`)
    screen.getByText(`likes: ${blog.likes}`)
    screen.getByText(`${blog.user.name}`)
  })

  test('clicking the like-button twice calls the event handler twice', async () => {
    render(<Blog blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} />)

    const spyUpdateBlog = jest.spyOn(blogService, 'updateBlog').mockImplementation((event) => {})

    const viewButton = screen.getByText('view')
    await clickUser.click(viewButton)

    const likeButton = screen.getByText('like')
    await clickUser.click(likeButton)
    await clickUser.click(likeButton)

    expect(spyUpdateBlog).toBeCalledTimes(2)
  })

})

afterEach(async () => {
  jest.restoreAllMocks()
})