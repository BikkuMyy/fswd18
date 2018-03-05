import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Button } from 'semantic-ui-react'

class SingleBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteVisible: this.props.blog.user === null
        || this.props.blog.user.username === this.props.loggedUser.username
        ? true : false
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

    const showDelete = { display: this.state.deleteVisible ? '' : 'none' }

    return (
      <div>
        <h2>{this.props.blog.title}</h2>
        <h3>By {this.props.blog.author}</h3>

        <a href={this.props.blog.url}>{this.props.blog.url}</a><br />
        {this.props.blog.likes} likes &nbsp;
        <Button onClick={this.addLike}>like </Button><br />
        added by {this.props.blog.user !== null ? this.props.blog.user.name : 'anonymous'}
        <br />
        <Button onClick={this.delete} style={showDelete}>
          delete if you dare ;)
        </Button>

      </div>
    )
  }
}

export default connect(
  null,
  { deleteBlog, likeBlog }
)(SingleBlog)