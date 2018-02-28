import { createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { applyMiddleware } from 'redux'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store