import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            kaikki: [],
            palaute: [0, 0, 0]
        }
    }

    annaPalaute = (arvo) => {
        const kopio = [...this.state.palaute]
        kopio[arvo + 1] += 1
        return () => {
            this.setState({
                palaute: kopio,
                kaikki: this.state.kaikki.concat(arvo)
            })
        }
    }

    render() {
        return (
            <div>
                <Header text="Anna palautetta" />
                <div>
                    <Button
                        handleClick={this.annaPalaute(1)}
                        text="hyvä"
                    />
                    <Button
                        handleClick={this.annaPalaute(0)}
                        text="neutraali"
                    />
                    <Button
                        handleClick={this.annaPalaute(-1)}
                        text="huono"
                    />
                </div>
                <Header text="Statistiikka" />
                <Statistics state={this.state} />
            </div>
        )
    }
}

const Header = ({ text }) => <h2>{text}</h2>

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({ state }) => {
    if (state.kaikki.length === 0) {
        return (
            <div> ei yhtään palautetta annettu </div>
        )
    }

    const laskeKeskiarvo = () => {
        let summa = 0
        state.kaikki.forEach(luku => {
            summa += luku
        })
        return (
            <div>
                {summa / state.kaikki.length}
            </div>
        )
    }

    const laskePositiiviset = () => {
        let lkm = 0
        state.kaikki.forEach(luku => {
            if (luku >= 0) {
                lkm++
            }
        })
        return (
            <div>
                {lkm / state.kaikki.length}
            </div>
        )
    }

    return (
        <div>
            <table>
                <tbody>
                    <Statistic name="hyvä" value={state.palaute[2]} />
                    <Statistic name="neutraali" value={state.palaute[1]} />
                    <Statistic name="huono" value={state.palaute[0]} />
                    <Statistic name="keskiarvo" value={laskeKeskiarvo()} />
                    <Statistic name="positiivisia" value={laskePositiiviset()} />
                </tbody>
            </table>
        </div>
    )
}

const Statistic = ({ name, value }) => {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
        </tr>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
