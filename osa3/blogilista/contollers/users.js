const bcrypt = require('bcrypt')

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password || password.length < 3) {
    response.status(400).json({ 'error':'password must be at least 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// usersRouter.delete('/:id', async (request, response) => {
//   await User.findByIdAndDelete(request.params.id)
//   response.status(204).end()
// })

// usersRouter.put('/:id', async (request, response) => {
//   const user = request.body
//   const updatedUser = await User.findByIdAndUpdate(request.params.id, user, { new:true })
//   response.json(updatedUser)
// })

module.exports = usersRouter