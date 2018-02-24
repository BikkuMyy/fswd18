import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title and author', () => {
    const blog = {
      title: 'TestingBlog',
      author: 'TestNinja',
      likes: 0
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const infoDiv = blogComponent.find('.info')
    expect(infoDiv.text()).toContain(blog.title, blog.author)
  })

  it('renders likes', () => {
    const blog = {
      title: 'TestingBlog',
      author: 'TestNinja',
      likes: 500
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const likesDiv = blogComponent.find('.likes')
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('calls event handler twice when clicking the button twice', () => {
    const blog = {
      title: 'TestingBlog',
      author: 'TestNinja',
      likes: 5
    }

    const mockHandler = jest.fn()
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
