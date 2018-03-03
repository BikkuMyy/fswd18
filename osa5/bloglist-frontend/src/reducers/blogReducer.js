import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  switch (action.type) {
    case 'DELETE':
      return store.filter(b => b.id !== action.id)
    case 'CREATE':
      return [...store, action.data]
    case 'INIT':
      return action.data
    case 'LIKE':
      const old = store.filter(b => b.id !== action.data.id)
      return [...old, action.data]
  }
  return store
}

export const blogInit = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })

  }
}

export const newBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      id
    })
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.update(id, blog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export default blogReducer