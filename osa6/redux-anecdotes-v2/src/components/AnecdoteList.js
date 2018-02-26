import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import Filter from '../components/Filter'

class AnecdoteList extends React.Component {
  render() {
    const filter = this.props.store.getState().filter
    const anecdotes = this.props.store
      .getState().anecdotes
      .filter(a => a.content
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase()))
    return (
      <div>
        <h2>Anecdotes</h2>

        <Filter store={this.props.store} />

        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.props.store.dispatch(vote(anecdote.id))
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
