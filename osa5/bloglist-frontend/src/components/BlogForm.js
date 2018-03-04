import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { newBlog } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ['title']: '',
      ['author']: '',
      ['url']: '',
      formVisible: false
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

    const hideWhenVisible = { display: this.state.formVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.formVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button onClick={e => this.setState({ formVisible: true })}>Luo uusi</Button>
        </div>
        <div style={showWhenVisible}>
          <h2>Lisää uusi blogi</h2>
          <Form onSubmit={this.createBlog}>
            <Form.Field>
              <label>Title</label>
              <input
                value={this.state.title}
                name='title'
                onChange={this.handleFormFieldChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <input
                value={this.state.author}
                name='author'
                onChange={this.handleFormFieldChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Url</label>
              <input
                value={this.state.url}
                name='url'
                onChange={this.handleFormFieldChange}
              />
            </Form.Field>
            <Button type='submit'>Luo uusi</Button>
          </Form>
          <Button onClick={e => this.setState({ formVisible: false })}>Peruuta</Button>
        </div>
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