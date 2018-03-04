import userService from '../services/users'

const userReducer = (store = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'UPDATE':
      const old = store.filter(u => u.id !== action.data.id)
      return [...old, action.data]
    default:
      return store
  }
}

export const userInit = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const blogAdded = (id) => {
  return async (dispatch) => {
    const user = await userService.getbyId(id)
    dispatch({
      type: 'UPDATE',
      data: user
    })
  }
}

export default userReducer