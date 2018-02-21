import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      ['username']: '',
      ['password']: '',
      user: null,
      alert: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
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
      this.setState({
        alert: 'väärä käyttäjätunnus tai salasana'
      })
      setTimeout(() => {
        this.setState({ alert: null })
      }, 5000)
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

  addNewBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject)
    this.setState({
      blogs: this.state.blogs.concat(newBlog),
      alert: `Lisätty ${newBlog.title}, tekijä ${newBlog.author} `
    })
    setTimeout(() => {
      this.setState({ alert: null })
    }, 5000)
  }

  render() {

    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>kirjaudu</button>
          </div>
          <div style={showWhenVisible}>
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

    const blogList = () => (
      <div>
        <h2>Blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )

    return (
      <div>
        <h1>Blogilista</h1>
        <Notification message={this.state.alert} />
        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} kirjautunut sisään
              <button onClick={this.logout}>Kirjaudu ulos</button>
            </p>
            <BlogForm addNewBlog={this.addNewBlog} />
            {blogList()}
          </div>
        }
      </div>
    )
  }
}

export default App;
