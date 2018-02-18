const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, format } = require('./test_helper')

describe('getting blogs from db', async () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObject = initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogObject.map(blog => blog.save()))
  })

  test('all blogs are returned as JSON by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)
    const returnedContents = response.body.map(format)
    blogsInDatabase.forEach(blog => {
      expect(returnedContents).toContainEqual(blog)
    })
  })
})

describe('addition of a new blog', async () => {
  test('POST to /api/blogs adds a valid blog', async () => {
    const blogsBefore = await blogsInDb()

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

    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(blogsAfter).toContainEqual(newBlog)
  })

  test('POSTing a blog with no value for likes has 0 likes', async () => {
    const blogWithNoLikes = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
    }

    await api
      .post('/api/blogs')
      .send(blogWithNoLikes)
      .expect(201)

    const response = await blogsInDb()
    expect(response).toContainEqual(expect.objectContaining({ likes: 0 }))
  })

  test('POST to /api/blogs fails with no title and url', async () => {
    const blogWithNoTitleOrUrl = {
      author: "Robert C. Martin"
    }

    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(blogWithNoTitleOrUrl)
      .expect(400)

    const blogsAfter = await blogsInDb()
    expect(blogsBefore.length).toBe(blogsAfter.length)
  })


})

describe('deletion of a blog', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: "To be deleted",
      author: "testing",
      url: "www.deletethis.com"
    })
    await addedBlog.save()
  })

  test('DELETE /api/blogs/:id succeeds with correct status', async () => {
    const blogsBefore = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    expect(blogsBefore).not.toContainEqual(addedBlog)
  })
})

afterAll(() => {
  server.close()
})