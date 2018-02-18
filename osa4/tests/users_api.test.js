const supertest = require('supertest')
const User = require('../models/user')
const { usersInDb } = require('./test_helper.js')
const { app, server } = require('../index')
const api = supertest(app)

describe('adding an invalid new user fails', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: "sikret" })
    await user.save()
  })

  test('POST api/users fails if username is taken', async () => {
    const usersBefore = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Super',
      password: 'salanen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body).toEqual({ error: 'username must be unique' })

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)

  })

  test('POST to api/users fails if password is too short', async () => {
    const usersBefore = await usersInDb()

    const newUser = {
      username: 'newone',
      name: 'Duper',
      password: 'sa'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body).toEqual({ error: 'password must have min 3 characters' })

    const usersAfter = await usersInDb()
    expect(usersAfter.length).toBe(usersBefore.length)
  })
})

afterAll(() => {
  server.close()
})