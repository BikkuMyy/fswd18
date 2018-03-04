import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { List, Button } from 'semantic-ui-react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailVisible: false,
      deleteVisible: true
    }
  }

  addLike = () => {
    const blog = this.props.blog
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1
    }

    this.props.likeBlog(blog.id, blogObject)
  }

  delete = () => {
    const blog = this.props.blog
    if (window.confirm(`poistetaanko blogi ${blog.title}, tekijä ${blog.author}`)) {
      this.props.deleteBlog(blog.id)
    }
  }

  render() {

    const showDetails = { display: this.state.detailVisible ? '' : 'none' }
    const showDelete = { display: this.state.deleteVisible ? '' : 'none' }

    return (
      <List.Content>
        <div>
          <div className='info' onClick={e => this.setState({ detailVisible: !this.state.detailVisible })}>
            <List.Header>{this.props.blog.title} - {this.props.blog.author}</List.Header>
          </div>
          <div className='detail' style={showDetails}>
            <p>
              <a href={this.props.blog.url}>{this.props.blog.url}</a><br />
              {this.props.blog.likes} likes &nbsp;
              <Button onClick={this.addLike}>like </Button><br />
              added by {this.props.blog.user !== null ? this.props.blog.user.name : 'anonymous'}
              <br />
              <Button onClick={this.delete} style={showDelete}>
                delete
              </Button>
            </p>
          </div>
        </div>
      </List.Content>
    )
  }
}
export default connect(
  null,
  { deleteBlog, likeBlog }
)(Blog)