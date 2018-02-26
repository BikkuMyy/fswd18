const initialState = ''

const filterReducer = (store=initialState, action) => {
  switch(action.type){
    case 'UPDATE':
      return store = action.filter
  }
  return store
}

export const updateFilter = (filter) => {
  return {
    type: 'UPDATE',
    filter
  }
}

export default filterReducer