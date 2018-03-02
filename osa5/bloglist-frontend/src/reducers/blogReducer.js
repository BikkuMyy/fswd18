import blogService from '../services/blogs'

const blogReducer = (store = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const old = store.filter(a => a.id !== action.data.id)
      return [...old, action.data]
    case 'CREATE':
      return [...store, action.data]
    case 'INIT':
      return action.data
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

/* export const like = (blog) => {
  return async (dispatch) => {
    const newObject = { 
    }
    const newBlog = await blogService.update(blog.id, newObject)
    dispatch({
      type: 'LIKe',
      data: newBlog
    })
  }
} */

export default blogReducer