import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ''
        }
    }

    componentWillMount() {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                this.setState({ countries: response.data })
            })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        const countriesToShow = () => {
            let countriesFiltered =
                this.state.countries
                    .filter(country => country.name.toLocaleLowerCase().includes(this.state.filter))

            if (this.state.filter === '') {
                return (<div></div>)
            } else if (countriesFiltered.length > 10) {
                return (
                    <div>
                        <p>too many matches, specify the filter</p>
                    </div>
                )
            } else if (countriesFiltered.length > 1) {
                return (
                    <div>
                        {countriesFiltered.map(country => <p>{country.name}</p>)}
                    </div>
                )
            }
        }

        return (
            <div>
                find countries:
                <input
                    value={this.state.filter}
                    onChange={this.handleFilterChange}
                />
                <div>
                    {countriesToShow()}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
