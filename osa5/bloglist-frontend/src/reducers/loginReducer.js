
const loginReducer = (store = null, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return null
    case 'SET':
      return action.user
  }
  return store
}

export const setLoggedUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      user
    })
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer


