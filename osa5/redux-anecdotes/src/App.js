import React from 'react';


class App extends React.Component {

  vote = (id) => (event) => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: { id }
    })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'NEW',
      data: {
        content: event.target.anecdote.value
      }
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort(function (a, b) {
            return b.votes - a.votes
          })
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={this.vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App