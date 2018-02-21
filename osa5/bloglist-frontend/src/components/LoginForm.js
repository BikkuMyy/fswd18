import React from 'react'

const LoginForm = ({ username, password, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2>Kirjaudu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus:
          <input
            type='text'
            name='username'
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          salasana:
            <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm
