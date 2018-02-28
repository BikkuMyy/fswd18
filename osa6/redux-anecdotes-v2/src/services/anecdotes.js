import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

const createNew = async (content) => {
  const res = await axios.post(url, {content, votes: 0})
  return res.data
}

const update = async (anecdote) => {
  const newObject = {
    content: anecdote.content,
    votes: anecdote.votes + 1
  }
  const res = await axios.put(`${url}/${anecdote.id}`, newObject)
  return res.data
}

export default { getAll, createNew, update }