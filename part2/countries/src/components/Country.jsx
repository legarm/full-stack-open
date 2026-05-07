import Weather from "./Wheater";

const Country = ({detailCountry}) => {
    
    const [country] = detailCountry;

    return (
      <>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Area: {country.area}</div>
        <h1>Languages</h1>
        {Object.values(country.languages).map(language =>
            <ul key={language}>
                <li>{language}</li>
            </ul>
        )}
        <img src={country.flags.png} alt={country.flags.alt} />
        <Weather city={country.capital[0]}/>
      </>
    )
}

export default Country;