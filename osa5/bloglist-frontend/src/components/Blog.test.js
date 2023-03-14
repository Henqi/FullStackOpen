import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog renders only title & author by default', () => {
  const user = {
    name: 'Henri',
    token: 'pajatso',
    username: 'IsoH'
  }

  const blog = {
    author: 'Pate',
    title: 'Teaching Finnish',
    url: 'opeton.com',
    user: user
  }

  const blogs = []
  const setBlogs = () => {}
  const setSuccessMessage = () => {}

  render(<Blog blog={blog} user={user} blogs={blogs} setBlogs={setBlogs} setSuccessMessage={setSuccessMessage} />)
  screen.getByText('Teaching Finnish - Pate')
  screen.debug()

})