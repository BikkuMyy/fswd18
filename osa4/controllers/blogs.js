const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs.map(Blog.format))
})

blogsRouter.post('/', (request, response) => {
  const body = request.body

  if (body.title === undefined && body.url === undefined) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    })

    blog
      .save()
      .then(result => {
        response.status(201).json(Blog.format(result))
      })
  }
})

module.exports = blogsRouter