import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            pisteet: [0, 0, 0, 0, 0, 0]
        }
    }

    seuraava = () => {
        const uusiArvo = Math.floor(Math.random()*6)
        return () => {
            this.setState({ selected: uusiArvo })
        }
    }

    aanesta = () => {
        let kopio = [...this.state.pisteet]
        kopio[this.state.selected] += 1
        return () => {
            this.setState({ pisteet: kopio})
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.anecdotes[this.state.selected]}
                </div>
                <div> {this.state.pisteet[this.state.selected]} ääntä </div>
                <div>
                    <Button
                        handleClick={this.seuraava()}
                        text='seuraava'
                    />
                    <Button
                        handleClick={this.aanesta()}
                        text='aanesta'
                    />
                </div>
                <Most state = {this.state}/>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Most = ({state}) => {
    const suurin = Math.max.apply(Math, state.pisteet)
    const indeksi = state.pisteet.indexOf(suurin)
    return (
        <div>
            <h2>eniten äänestetty:</h2>
            {anecdotes[indeksi]} <br/>
            {suurin} ääntä
        </div>
    )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

