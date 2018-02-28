
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

export const anecdoteInit = (data) => {
  return {
    type: 'INIT',
    data
  }
}

export const newAnecdote = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const vote = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export default anecdoteReducer