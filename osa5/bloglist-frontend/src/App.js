import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUser){
      const user = JSON.parse(loggedUser)
      this.setState({user})
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
        error: 'väärä käyttäjätunnus tai salasana'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
    this.setState({user: null})
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    console.log(event.target.value)
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Kirjaudu</h2>
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus:
              <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana:
                <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type='submit'>Kirjaudu</button>
        </form>
      </div>
    )

    const blogList = () => (
      <div>
        <h2>Blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )

    return(
      <div>
        <h1>Blogilista</h1>
        <Notification message={this.state.error}/>
        {this.state.user === null ? 
          loginForm() : 
          <div>
            <p>{this.state.user.name} kirjautunut sisään </p>
            <button onClick={this.logout}>Kirjaudu ulos</button>
          {blogList()}
          </div>
        }
      </div>
    )
  }
}

export default App;
