import React from 'react' 

const Otsikko = ({ teksti}) => {
    return (
        <h1>{teksti}</h1>
    )
}

const Sisalto = ({ osat }) => {
    return (
        <div>
            {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>
    )
}

const Osa = ({ osa }) => {
    return (
        <p>{osa.nimi} {osa.tehtavia}</p>
    )
}

const Yhteensa = ({ osat }) => {
    const yhteensa = osat.reduce(function (sum, osa) {
        return sum + osa.tehtavia
    }, 0)
    return (
        <p>yhteensä {yhteensa} tehtävää</p>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko teksti={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}

export default Kurssi