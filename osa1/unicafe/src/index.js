import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

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
                        handleClick={e => store.dispatch({ type: "GOOD" })}
                        text="hyvä"
                    />
                    <Button
                        handleClick={e => store.dispatch({ type: "OK" })}
                        text="neutraali"
                    />
                    <Button
                        handleClick={e => store.dispatch({ type: "BAD" })}
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

    const laskeKeskiarvo = () => {
        let summa = 0
        state.kaikki.forEach(luku => {
            summa += luku
        })
        if (summa === 0) {
            return (
                <div>0</div>
            )
        }
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
        if (lkm === 0) {
            return (
                <div>0</div>
            )
        }
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
                    <Statistic name="hyvä" value={store.getState().good} />
                    <Statistic name="neutraali" value={store.getState().ok} />
                    <Statistic name="huono" value={store.getState().bad} />
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

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)

