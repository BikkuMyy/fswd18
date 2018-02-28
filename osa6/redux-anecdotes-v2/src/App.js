import React from 'react'
import { connect } from 'react-redux'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { anecdoteInit } from './reducers/anecdoteReducer'

class App extends React.Component {
  componentDidMount = async () => {
    this.props.anecdoteInit()
  }

  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification store={this.props.store} />
        <AnecdoteList store={this.props.store} />
        <AnecdoteForm store={this.props.store} />
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteInit }
)(App)