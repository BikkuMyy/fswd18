const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

beforeAll(async () => {
  await Blog.remove({})
  console.log('cleared db')
  const blogObject = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('initialized db')
})

test('blogs are returned', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('new blog can be added', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(response.body).toContainEqual(expect.objectContaining(newBlog))
})

test('blog with no value for likes has 0 likes', async () => {
  const blogWithNoLikes = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
  }

  await api
    .post('/api/blogs')
    .send(blogWithNoLikes)

  const response = await api.get('/api/blogs')
  expect(response.body).toContainEqual(expect.objectContaining({ likes: 0 }))
})

test('blog with no title and url is not saved', async () => {
  const blogWithNoTitleOrUrl = {
    author: "Robert C. Martin"
  }

  await api
    .post('/api/blogs')
    .send(blogWithNoTitleOrUrl)
    .expect(400)
})

afterAll(() => {
  server.close()
})