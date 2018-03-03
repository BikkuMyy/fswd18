import React from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

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

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showDetails = { display: this.state.detailVisible ? '' : 'none' }
    const showDelete = { display: this.state.deleteVisible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div className='info' onClick={e => this.setState({ detailVisible: !this.state.detailVisible })}>
          {this.props.blog.title} - {this.props.blog.author}
        </div>
        <div className='detail' style={showDetails}>
          <p>
            <a href={this.props.blog.url}>{this.props.blog.url}</a><br />
            {this.props.blog.likes} likes
            <button onClick={this.addLike}>like</button><br />
            {/* added by {this.props.blog.user !== null ? this.props.blog.user.name : 'anonymous'} */}
            <br />
            <button onClick={this.delete} style={showDelete}>
              delete
            </button>
          </p>
        </div>

      </div>
    )
  }
}
export default connect(
  null,
  { deleteBlog, likeBlog }
)(Blog)