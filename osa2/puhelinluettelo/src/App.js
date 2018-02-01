import React from 'react';
import Person from './components/Person'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    componentWillMount() {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                this.setState({ persons: response.data})
            })
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    addName = (event) => {
        event.preventDefault()

        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        //tähän joku parempi ratkaisu?
        const newN = this.state.newName
        const find = this.state.persons.find(function (obj) { return obj.name === newN })

        if (find === undefined) {
            const persons = this.state.persons.concat(personObject)

            this.setState({
                persons,
                newName: '',
                newNumber: ''
            })
        } else {
            alert('Nimi käytössä, valitse toinen nimi!')
        }
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        const personsToShow =
            this.state.persons.filter(person => person.name.toLocaleLowerCase().includes(this.state.filter))

        return (
            <div>
                <h2>Puhelinluettelo</h2>
                rajaa näytettäviä:
                <input
                    value={this.state.filter}
                    onChange={this.handleFilterChange}
                />
                <h3>Lisää uusi</h3>
                <form onSubmit={this.addName}>
                    nimi:
                    <input
                        value={this.state.newName}
                        onChange={this.handleNameChange}
                    />
                    <br />
                    numero:
                    <input
                        value={this.state.newNumber}
                        onChange={this.handleNumberChange}
                    />
                    <button type="submit">lisää</button>

                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {personsToShow.map(person => <Person key={person.name} person={person} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App