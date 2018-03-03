import React from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { userInit } from './reducers/userReducer'
import { blogInit } from './reducers/blogReducer'
import { logoutUser, setLoggedUser } from './reducers/loginReducer'


class App extends React.Component {

  componentDidMount() {
    this.props.blogInit()
    //this.props.userInit()

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

  render() {
    return (
      <div>
        <h1>Blogilista</h1>
        <Notification />
        {this.props.user === null ?
          <LoginForm /> :
          <div>
            <p>{this.props.user.name} kirjautunut sisään
            <button onClick={this.logout}>Kirjaudu ulos</button>
            </p>
            <BlogForm addNewBlog={this.addNewBlog} />
            <BlogList />
          </div>
        }
        {/* <UserList /> */}
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
  mapStateToProps,
  { notify, userInit, blogInit, logoutUser, setLoggedUser }
)(App)
