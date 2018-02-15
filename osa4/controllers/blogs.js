const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  console.log('get')
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(Blog.format))
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(Blog.format(result))
    })
})

module.exports = blogsRouter