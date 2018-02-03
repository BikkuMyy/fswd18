import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Country from './components/Country'

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

    handleClick = ({country}, event) => {
        event.preventDefault()
        this.setState({ filter: country})
    }

    render() {
        const countriesToShow = () => {
            const countriesFiltered =
                this.state.countries
                    .filter(country => country.name.toLocaleLowerCase().includes(this.state.filter))

            if (this.state.filter === '' || countriesFiltered.length === 0) {
                return (<div>no results, change filter</div>)
            } else if (countriesFiltered.length > 10) {
                return (
                    <div>too many matches, specify the filter</div>
                )
            } else if (countriesFiltered.length > 1) {
                return (
                    <div>
                        {countriesFiltered.map(country => <Country key={country.name} country={country.name}/>)}
                    </div>
                )
            }
            let country = countriesFiltered[0]
            return (
                <div>
                    <h2>{country.name} {country.nativeName}</h2>
                    <div>capital: {country.capital}</div>
                    <div>population: {country.population}</div>
                    <img src={country.flag} alt='flag' width='500' height='350'/>
                </div>
            )
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
