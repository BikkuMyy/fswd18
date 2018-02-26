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

export const showNotification = (message) => {
  return {
    type: 'SHOW',
    message
  }
}

export const hideNotification = () => {
  return { type: 'HIDE' }
}

export default notificationReducer