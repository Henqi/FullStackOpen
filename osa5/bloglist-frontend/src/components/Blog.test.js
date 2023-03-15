import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


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
  const blogs = []
  const setBlogs = () => {}
  const setSuccessMessage = () => {}

  test('blog renders only title & author by default', () => {

    render(<Blog blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} />)
    screen.getByText(`${blog.title} - ${blog.author}`)
  })

  test('url, likes & user is rendered after user clicks "view" button', async () => {

    render(<Blog blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} />)
    const clickUser = userEvent.setup()
    const button = screen.getByText('view')
    await clickUser.click(button)

    screen.getByText(`${blog.title} - ${blog.author}`)
    screen.getByText(`${blog.url}`)
    screen.getByText(`likes: ${blog.likes}`)
    screen.getByText(`${blog.user.name}`)
  })

})