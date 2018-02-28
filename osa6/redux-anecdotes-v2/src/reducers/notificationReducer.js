const initialState = ''

const notificationReducer = (store = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return store = action.message
    case 'HIDE':
      return store = ''
  }
  return store
}

export const notify = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW',
      message
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, time * 1000)
  }
}

export default notificationReducer