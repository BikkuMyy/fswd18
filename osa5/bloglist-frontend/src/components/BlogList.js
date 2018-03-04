import React from 'react'
import { connect } from 'react-redux'
import Blog from '../components/Blog'
import { Segment, List } from 'semantic-ui-react'

class BlogList extends React.Component {
  render() {
    return (
      <div>
        <h2>Blogs</h2>
        <Segment>
          <List divided relaxed>
            {this.props.blogs
              .sort(function (a, b) {
                return b.likes - a.likes
              })
              .map(blog =>
                <List.Item key={blog._id}>
                  <Blog blog={blog} />
                </List.Item>
              )}
          </List>
        </Segment>
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