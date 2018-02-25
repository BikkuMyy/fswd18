import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'


describe.only(<App />, () => {
  let app

  describe('before login', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders no blogs before login', () => {
      app.update()
      if (!window.localStorage.getItem('loggedBloglistUser')) {

        const login = app.find('.noUser')
        const button = login.find('button')
        button.simulate('click')

        const loginForm = app.find('.login')
        const blogComponents = app.find(Blog)
        expect(loginForm.getElement().props.style).toEqual({ display: '' })
        expect(blogComponents.length).toEqual(0)
      }
    })
  })

  describe('after login', () => {
    beforeEach(() => {
      app.mount(<App />)

      const user = {
        username: 'testeri',
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlcmkiLCJpZCI6IjVhODliZWZhNzNlZTAxMjc3MTQyMjM4OSIsImlhdCI6MTUxOTQ5MDU5OX0.D7Ms02OYFBI4KmWrtqQEw5ZsWjp7VYyJPMXy5c19Azc",
        name: 'Zetor'
      }
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    })

    it('renders all blogs after login', () => {
      app.update()

      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })

})
