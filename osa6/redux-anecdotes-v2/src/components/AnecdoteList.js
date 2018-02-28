import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import Filter from '../components/Filter'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.filteredAnecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={async() => {
                  const newAnecdote = await anecdoteService.update(anecdote)
                  this.props.vote(newAnecdote)
                }}>
                  vote
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes
    .filter(a => a.content
      .toLocaleLowerCase()
      .includes(filter.toLocaleLowerCase()))
}

const mapStateToProps = (store) => {
  return {
    filteredAnecdotes: anecdotesToShow(store.anecdotes, store.filter)
  }
}

export default connect(
  mapStateToProps,
  { vote }
)(AnecdoteList)
