let token = null

const blogs = [
  {
    title: "Traktoriblogi",
    author: "Setori",
    url: "www.rattori.fi",
    likes: 0,
    id: "5a9166fe8135031c608efa6e",
    user: {
      _id: "5a89befa73ee012771422389",
      username: "testeri",
      name: "Zetor"
    }
  },
  {
    title: "But three is a crowd",
    author: "Hii",
    url: "www.important.com",
    likes: 0,
    id: "5a9178628135031c608efa6f",
    user: {
      _id: "5a89be9873ee012771422387",
      username: "tester",
      name: "Ukko"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, blogs }

