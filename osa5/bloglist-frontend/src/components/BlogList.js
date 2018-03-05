import React from 'react'
import { connect } from 'react-redux'
import { Segment, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
                <List.Item key={blog.id}>
                  <List.Content>
                    <List.Header>
                      <Link to={`/blogs/${blog.id}`}>
                        {blog.title} - {blog.author}
                      </Link>
                    </List.Header>
                  </List.Content>
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