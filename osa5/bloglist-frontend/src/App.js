import React from 'react'
import './index.css'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import SingleBlog from './components/SingleBlog'
import blogService from './services/blogs'
import User from './components/User'
import { connect } from 'react-redux'
import { blogInit } from './reducers/blogReducer'
import { userInit } from './reducers/userReducer'
import { logoutUser, setLoggedUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'

class App extends React.Component {

  componentDidMount() {
    this.props.blogInit()
    this.props.userInit()

    const loggedUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.props.setLoggedUser(user)
      blogService.setToken(user.token)
    }
  }

  logout = (event) => {
    event.preventDefault()
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
    this.props.logoutUser()
  }

  findBlogById = (id) => {
    return this.props.blogs.find(b => b.id === id)
  }

  findUserById = (id) => {
    return this.props.users.find(u => u.id === id)
  }

  render() {

    return (
      <Container>
        <div>
          <h1>Blogilista</h1>
          <Notification />
          {this.props.user === null ?
            <LoginForm /> :
            <div>
              <Router>
                <div>
                  <div>
                    <div className="menu">
                      <NavLink exact to="/blogs" activeClassName="selected">blogs</NavLink>&nbsp;
                      <NavLink to="/users" activeClassName="selected">users</NavLink>
                      <p>{this.props.user.name} kirjautunut sisään &nbsp;
                      <Button onClick={this.logout}>Kirjaudu ulos</Button>
                      </p>
                    </div>
                    <div>
                      <BlogForm />
                    </div>
                  </div>
                  <Route exact path="/blogs" render={() => <BlogList />} />
                  <Route exact path="/users" render={() => <UserList />} />
                  <Route path="/users/:id" render={({ match }) =>
                    <User user={this.findUserById(match.params.id)} />
                  } />
                  <Route path="/blogs/:id" render={({ match }) =>
                    <SingleBlog
                      blog={this.findBlogById(match.params.id)}
                      loggedUser={this.props.user}
                    />
                  } />
                </div>
              </Router>
            </div>
          }
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.loggedUser,
    blogs: store.blogs,
    users: store.users
  }
}
export default connect(
  mapStateToProps,
  { userInit, blogInit, logoutUser, setLoggedUser }
)(App)
