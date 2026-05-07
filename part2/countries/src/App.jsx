import { useEffect, useState } from 'react';
import countryService from './services/countries.js';
import Country from './components/Country.jsx';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then(initialCountries => {
      setCountries(initialCountries);
    })
  }, []);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);

    const filtered = countries.filter(c => c.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredCountries(filtered);
  }

  const onSubmit = e => {
    e.preventDefault();
  }

  const onHandleClick = (selectedCountry) => {
    setFilteredCountries([selectedCountry])
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <span>find countries </span>
        <input type="text" value={country} onChange={handleCountryChange}/>
        {filteredCountries.length > 10 
        ? <p>Too many matches, specify another filter</p>
        : 
          filteredCountries.length === 1 
          ? <Country detailCountry={filteredCountries}/>
          : filteredCountries.map(country => <p key={country.ccn3}>{country.name.common}<button onClick={() => onHandleClick(country)}>show</button></p>)}
      </form>
    </>
  )
}

export default App;
