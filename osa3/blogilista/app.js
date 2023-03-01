const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./contollers/blogs')
const usersRouter = require('./contollers/users')
const loginRouter = require('./contollers/login')
const mongoose = require('mongoose')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to ', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app