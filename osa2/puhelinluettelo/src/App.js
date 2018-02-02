import React from 'react';
import Person from './components/Person'
import personService from './services/persons'

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
        personService
            .getAll()
            .then(response => {
                this.setState({ persons: response })
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

        //jos nimi jo luettelossa, kysytään, halutaanko numero päivittää
        const find = this.state.persons.find(p => p.name === this.state.newName)

        if (find === undefined) {
            personService
                .create(personObject)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: ''
                    })
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

    removePerson = (id) => {
        //miten varoitus toteutetaan??
        return () => {
            //window.confirm(`Poistetaanko', ${this.state.persons[id].name}`)
            personService
                .remove(id)
                .then(response => {
                    this.setState({
                        persons: this.state.persons.filter(p => p.id !== id)
                    })
                })
        }
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
                    <br />
                    <button type="submit">lisää</button>

                </form>
                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {personsToShow.map(person =>
                            <Person
                                key={person.name}
                                person={person}
                                remove={this.removePerson(person.id)}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App