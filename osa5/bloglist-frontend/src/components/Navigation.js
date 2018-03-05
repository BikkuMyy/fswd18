import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UserList from './UserList'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import { connect } from 'react-redux'

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <div>
              <Link to="/">blogs</Link>&nbsp;
                  <Link to="/users">users</Link>
              <p>{this.props.user.name} kirjautunut sisään
                  <button onClick={this.logout}>Kirjaudu ulos</button>
              </p>
              <BlogForm />
            </div>
            <Route exact path="/" render={() =>
              <div>
                <BlogList />
              </div>
            } />
            <Route path="/users" render={() =>
              <div>
                <UserList />
              </div>
            } />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.loggedUser
  }
}

export default connect(
  mapStateToProps
)(Navigation)