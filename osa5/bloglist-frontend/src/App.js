import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { userInit } from './reducers/userReducer'
import { blogInit } from './reducers/blogReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      ['username']: '',
      ['password']: '',
      user: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    this.props.blogInit()
    //this.props.userInit()

    const loggedUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })

    } catch (exception) {
      this.props.notify('väärä käyttäjätunnus tai salasana', 5)
    }
  }

  logout = (event) => {
    event.preventDefault()
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
    this.setState({ user: null })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    console.log(event.target.value)
  }


  render() {

    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div className='noUser' style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>kirjaudu</button>
          </div>
          <div className='login' style={showWhenVisible}>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>Peruuta</button>
          </div>
        </div>
      )
    }

/*     const blogList = () => (

      <div>
        <h2>Blogs</h2>
        {this.state.blogs
          .sort(function (a, b) {
            return b.likes - a.likes
          })
          .map(blog =>
            <Blog
              key={blog._id}
              blog={blog}
              updateBlog={this.updateBlog}
              deleteBlog={this.deleteBlog}
              deleteIsVisible={
                blog.user === null ||
                  this.state.user.username === blog.user.username
                  ? true : false
              }
            />
          )}
      </div>
    ) */

    return (
      <div>
        <h1>Blogilista</h1>
        <Notification />
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} kirjautunut sisään
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

//export default App
export default connect(
  null, { notify, userInit, blogInit }
)(App)
