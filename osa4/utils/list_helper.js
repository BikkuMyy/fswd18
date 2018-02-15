const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(b => b.likes).reduce((sum, b) => sum + b)
}

const favouriteBlog = (blogs) => {
  const reducer = (most, item) => {
    return item.likes > most.likes ? item : most
  }
  const result = blogs.reduce(reducer, blogs[0])
  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(b => b.author)
  const uniques = [...new Set(authors)]

  const counts = uniques.map(author => ({
    author: author,
    blogs: blogs.filter(b => b.author === author).length
  }))

  const reducer = (most, item) => {
    return item.blogs > most.blogs ? item : most
  }

  return counts.reduce(reducer, counts[0])
}

const mostLikes = (blogs) => {
  const authors = blogs.map(b => b.author)
  const uniques = [...new Set(authors)]

  const counts = uniques.map(author => ({
    author: author,
    likes: blogs.filter(b => b.author === author).map(b => b.likes).reduce((sum, l) => sum + l)
  }))

  const reducer = (most, item) => {
    return item.likes > most.likes ? item : most
  }

  return counts.reduce(reducer, counts[0])
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}