import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.newAnecdote(newAnecdote)
    this.props.showNotification(content)
    
    setTimeout(() => {
      this.props.hideNotification()
    }, 5000)

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
    showNotification,
    hideNotification
  }
)(AnecdoteForm)
