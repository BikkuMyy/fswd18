import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

class UserList extends React.Component {
  render() {
    return (
      <div>
        <h2>Users</h2>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>blogeja</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.users.map(user =>
              <Table.Row key={user.id}>
                <Table.Cell><a href={`/users/${user.id}`}>{user.name}</a></Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
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


