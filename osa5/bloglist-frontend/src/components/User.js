import React from 'react'
import { connect } from 'react-redux'


class User extends React.Component {
  render() {
    console.log(this.props.userToShow)
    return (
      <div>
        <h2>{this.props.userToShow.name}</h2>
        Blogit
        <ul>
          {this.props.userToShow.blogs.map(blog =>
            <li key={blog.id}>{blog.name}</li>
          )}
        </ul>
      </div>
    )
  }
}


const mapStateToProps = (store, ownProps) => {
  console.log(store.users)
  return {
    userToShow: store.users[ownProps.id]
  }
}

export default connect(
  mapStateToProps
)(User)