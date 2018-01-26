import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            good: 0,
            neutral: 0,
            bad: 0,
            kaikki: []
        }
    }

    hyvaPalaute = () => {
        this.setState({
            good: this.state.good + 1,
            kaikki: this.state.kaikki.concat(1)
        })
    }

    neutraaliPalaute = () => {
        this.setState({
            neutral: this.state.neutral + 1,
            kaikki: this.state.kaikki.concat(0)
        })
    }

    huonoPalaute = () => {
        this.setState({
            bad: this.state.bad + 1,
            kaikki: this.state.kaikki.concat(-1)
        })
    }

    

    

    render() {
        const laskeKeskiarvo = () => {
            //laske keskiarvo
        }

        const laskePositiiviset = () => {
            //laske positiivisten osuus (hyvä tai neutraali)
        }

        return (
            <div>
                <Header text="Anna palautetta"/>
                <div>
                    <Button 
                        handleClick={this.hyvaPalaute}
                        text="hyvä"
                    />
                    <Button 
                        handleClick={this.neutraaliPalaute}
                        text="neutraali"
                    />
                    <Button 
                        handleClick={this.huonoPalaute}
                        text="huono"
                    />
                </div>
                <Header text="Statistiikka"/>
                <div>
                    hyvä: {this.state.good}
                    <br/>
                    neutraali: {this.state.neutral}
                    <br/>
                    huono: {this.state.bad}
                    <br/>
                    keskiarvo:
                    <br/>
                    positiivisia:
                </div>
            </div>
        )
    }
}

const Header = ({text}) => <h2>{text}</h2>

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

ReactDOM.render(<App />, document.getElementById('root'));
