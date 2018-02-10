import React from 'react';
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            alert: null
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

    addPerson = (event) => {
        event.preventDefault()

        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        const personToAdd = this.state.persons.find(p => p.name === this.state.newName)

        if (personToAdd === undefined) {
            personService
                .create(personObject)
                .then(newPerson => {
                    this.setState({
                        persons: this.state.persons.concat(newPerson),
                        newName: '',
                        newNumber: '',
                        alert: `Henkilö ${newPerson.name} lisätty!`
                    })
                })
            setTimeout(() => {
                this.setState({ alert: null })
            }, 2000)

        } else {
            if (window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                personService
                    .update(personToAdd.id, personObject)
                    .then(updatedPerson => {
                        const persons = this.state.persons.filter(p => p.id !== personToAdd.id)
                        this.setState({
                            persons: persons.concat(updatedPerson),
                            newName: '',
                            newNumber: '',
                            alert: `Henkilön ${personToAdd.name} numero muutettu`
                        })
                    })
                    .catch(error => {
                        this.setState({
                            alert: `Muokattavan henkilön ${personToAdd.name} tiedot on jo poistettu :/`,
                            persons: this.state.persons.filter(p => p.id !== personToAdd.id)
                        })
                    })
                setTimeout(() => {
                    this.setState({ alert: null })
                }, 5000)
            }
        }
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value.toLocaleLowerCase() })
    }

    removePerson = (person) => {
        return () => {
            if (window.confirm(`Poistetaanko henkilö ${person.name}?`)) {
                personService
                    .remove(person.id)
                    .then(response => {
                        this.setState({
                            persons: this.state.persons.filter(p => p.id !== person.id),
                            alert: `${person.name} poistettu`
                        })
                    })
                setTimeout(() => {
                    this.setState({ alert: null })
                }, 2000)
            }

        }
    }

    render() {
        const personsToShow =
            this.state.persons.filter(p => p.name.toLocaleLowerCase().includes(this.state.filter))

        return (
            <div>
                <h2>Puhelinluettelo</h2>

                <Notification message={this.state.alert} />
                <br />
                rajaa näytettäviä:
                <input
                    value={this.state.filter}
                    onChange={this.handleFilterChange}
                />
                <h3>Lisää uusi</h3>
                <form onSubmit={this.addPerson}>
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
                                remove={this.removePerson(person)}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App