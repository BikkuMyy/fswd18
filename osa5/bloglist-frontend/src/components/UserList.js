import React from 'react'
import { connect } from 'react-redux'

class UserList extends React.Component {
  render() {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <th/>
              <th>blogeja</th>
            </tr>
            {this.props.users.map(user =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    users: store.users
  }
}

export default connect(
  mapStateToProps
)(UserList)


