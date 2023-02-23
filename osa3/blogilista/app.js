const { MONGODB_URI } = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./contollers/blog')
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

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app