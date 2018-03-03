import React from 'react'
import { connect } from 'react-redux'
import Blog from '../components/Blog'

class BlogList extends React.Component {
  render() {
    console.log(this.props.blogs)
    return (
      <div>
        <h2>Blogs</h2>
        {this.props.blogs
          .sort(function (a, b) {
            return b.likes - a.likes
          })
          .map(blog => <Blog key={blog._id} blog={blog}/>)}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    blogs: store.blogs
  }
}

export default connect(
  mapStateToProps
)(BlogList)