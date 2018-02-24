import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  it('first renders only title and author', () => {
    const blog = {
      title: 'TestingBlog',
      author: 'TestNinja',
      user: '5a89befa73ee012771422389'
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const infoDiv = blogComponent.find('.info')
    const detailDiv = blogComponent.find('.detail')
    expect(infoDiv.text()).toContain(blog.title, blog.author)
    expect(detailDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('shows details after clicking the header', () => {
    const blog = {
      title: 'TestingBlog',
      author: 'TestNinja',
      url: 'www.testurl.si',
      likes: 0,
      user: '5a89befa73ee012771422389'
    }

    const blogComponent = shallow(<Blog blog={blog} />)
    const infoDiv = blogComponent.find('.info')

    infoDiv.simulate('click')
    const detailDiv = blogComponent.find('.detail')
    expect(detailDiv.text()).toContain(blog.url, blog.likes)
  })
})