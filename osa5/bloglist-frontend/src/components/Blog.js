import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailVisible: false,
      deleteVisible: this.props.deleteIsVisible
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
    this.props.updateBlog(blogObject, blog.id)
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
    console.log(this.state.deleteVisible)

    return (
      <div style={blogStyle}>
        <div onClick={e => this.setState({ detailVisible: !this.state.detailVisible })}>
          {this.props.blog.title} - {this.props.blog.author}
          <div style={showDetails}>
            <p>
              <a href={this.props.blog.url}>{this.props.blog.url}</a><br />
              {this.props.blog.likes} likes
              <button onClick={this.addLike}>like</button><br />
              added by {this.props.blog.user.name}<br />
              <button onClick={this.delete} style={showDelete}>
                delete
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
export default Blog