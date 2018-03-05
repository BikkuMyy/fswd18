import React from 'react'

class User extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.user.name}</h2>
        Blogit
        <ul>
          {this.props.user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default User