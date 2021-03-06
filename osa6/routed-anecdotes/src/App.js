import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Button, Form } from 'semantic-ui-react'

const Menu = ({ state, addNew, anecdoteById }) => (

  <div>
    <Router>
      <div>
        <div style={menuStyle}>
          <NavLink exact to="/" activeStyle={selected}>anecdotes </NavLink>&nbsp;
          <NavLink to="/create" activeStyle={selected}>create new</NavLink>&nbsp;
          <NavLink to="/about" activeStyle={selected}>about</NavLink>&nbsp;
        </div>
        <Route exact path="/" render={() =>
          <div>
            <Notification message={state.notification} />
            <AnecdoteList anecdotes={state.anecdotes} />
          </div>
        }
        />
        <Route path="/create" render={() =>
          state.notification
            ? <Redirect to="/" />
            : <CreateNew addNew={addNew} />} />
        <Route path="/about" render={() => <About />} />
        <Route exact path="/anecdotes/:id" render={({ match }) =>
          <SingleAnecdote anecdote={anecdoteById(match.params.id)} />}
        />
      </div>
    </Router>
  </div>
)

const menuStyle = {
  color: 'purple',
  background: 'paleturquoise',
  padding: 10,
  marginBottom: 10,
  fontSize: 15
}

const selected = {
  color: 'purple',
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
  fontSize: 20
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
            <Table.Cell>
              {anecdote.author}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const SingleAnecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        for more info see:
        <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  )
}

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'purple',
    background: 'paleturquoise',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 15
  }
  if (message) {
    return (
      <div style={notificationStyle}>{message}</div>
    )
  } else {
    return (
      <div></div>
    )
  }

}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column width={11}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={5}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg'
            width="150"
            height="200"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({
      content: '',
      author: '',
      info: ''
    })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Anecdote</label>
          <input placeholder="content" name='content' value={this.state.content} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input placeholder="author" name='author' value={this.state.author} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Url for more info</label>
          <input name='info' value={this.state.info} onChange={this.handleChange} />
        </Form.Field>
        <Button type="submit">Create</Button>
      </Form>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created!`
    })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <div>
          <h1>Software anecdotes</h1>
          <Menu
            state={this.state}
            addNew={this.addNew}
            anecdoteById={this.anecdoteById}
          />
          <Footer />
        </div>
      </Container>
    );
  }
}

export default App;
