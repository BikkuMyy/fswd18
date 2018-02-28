import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const old = store.filter(a => a.id !== action.data.id)
      return [...old, action.data]
    case 'CREATE':
      return [...store, action.data]
    case 'INIT':
      return action.data
  }

  return store
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })

  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const newObject = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    const newAnecdote = await anecdoteService.update(anecdote.id, newObject)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer