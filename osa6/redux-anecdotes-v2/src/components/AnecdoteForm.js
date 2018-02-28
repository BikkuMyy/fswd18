import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    this.props.newAnecdote(content)
    this.props.notify(content, 5)

  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  {
    newAnecdote,
    notify
  }
)(AnecdoteForm)
