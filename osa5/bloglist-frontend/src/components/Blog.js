import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailVisible: false
    }
  }

  addLike = (event) => {
    const blog = this.props.blog
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1
    }
    this.props.updateBlog(blogObject, blog._id)
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const showWhenVisible = { display: this.state.detailVisible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div onClick={e => this.setState({ detailVisible: !this.state.detailVisible })}>
          {this.props.blog.title} - {this.props.blog.author}
          <div style={showWhenVisible}>
            <p>
              <a href={this.props.blog.url}>{this.props.blog.url}</a><br/>
              {this.props.blog.likes} likes
              <button onClick={this.addLike}>like</button><br />
              added by {this.props.blog.user.name}
            </p>

          </div>
        </div>
      </div>
    )
  }
}
export default Blog