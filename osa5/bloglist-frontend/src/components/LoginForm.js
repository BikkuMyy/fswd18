import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { setLoggedUser } from '../reducers/loginReducer'
import { Form, Button } from 'semantic-ui-react'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ['username']: '',
      ['password']: '',
      loginVisible: false
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      this.setState({ username: '', password: '' })
      this.props.setLoggedUser(user)

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

    } catch (exception) {
      this.props.notify('väärä käyttäjätunnus tai salasana', 5)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

    return (
      <div>
        <div className='noUser' style={hideWhenVisible}>
          <Button onClick={e => this.setState({ loginVisible: true })}>kirjaudu</Button>
        </div>
        <div className='login' style={showWhenVisible}>
          <h2>Kirjaudu</h2>
          <Form onSubmit={this.login}>
            <Form.Field>
              <label>Käyttäjätunnus</label>
              <input
                type='text'
                name='username'
                value={this.state.username}
                onChange={this.handleFieldChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Salasana</label>
              <input
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleFieldChange}
              />
            </Form.Field>
            <Button type='submit'>Kirjaudu</Button>
          </Form>
          <Button onClick={e => this.setState({ loginVisible: false })}>Peruuta</Button>
        </div>
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
  { notify, setLoggedUser }
)(LoginForm)
