import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ['title']: '',
      ['author']: '',
      ['url']: ''
    }
  }

  createBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    this.setState({
      title: '',
      author: '',
      url: ''
    })

    this.props.newBlog(blogObject)
    this.props.notify(`Lisätty ${blogObject.title}, tekijä ${blogObject.author}`, 5)
  }

  handleFormFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Lisää uusi blogi</h2>
        <form onSubmit={this.createBlog}>
          <div>
            title:
            <input
              value={this.state.title}
              name='title'
              onChange={this.handleFormFieldChange}
            />
          </div>
          <div>
            author:
            <input
              value={this.state.author}
              name='author'
              onChange={this.handleFormFieldChange}
            />
          </div>
          <div>
            url:
            <input
              value={this.state.url}
              name='url'
              onChange={this.handleFormFieldChange}
            />
          </div>
          <button type='submit'>Luo uusi</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  {
    newBlog,
    notify
  }
)(BlogForm)