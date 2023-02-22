const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { info, error } = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => {
        error(error.message)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => {
        error(error.message)
      })
  })

  module.exports = blogsRouter