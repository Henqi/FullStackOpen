const { MONGODB_URI } = require('./utils/config')
const { info, error } = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./contollers/blog')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI)
        .then(() => {
            info('connected to MongoDB')
        })
        .catch((error) => {
            error('error connecting to MongoDB: ', error.message)
        })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)


module.exports = app