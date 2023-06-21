import { useState, useEffect } from 'react';
import axios from 'axios';
const urlAllCountries = 'https://restcountries.com/v3.1/all';

export const SearchPage = () => {
  const [countries, setCountries] = useState(null);
  //   const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get(urlAllCountries).then((response) => {
      setCountries(response.data);
      //   setFilteredCountries(countries);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || countries === null) return <h2>chargement en cours</h2>;

  return (
    <section className='homeSection'>
      <div>
        <h2
          className='searchInput'
          onChange={(e) => setSearchValue(e.target.value)}
        >
          Page de recherche
        </h2>
        <input type='text' />
        <div className='countriesSection'>
          {countries !== null &&
            countries
              //   .filter((country) => country.languages.includes(searchValue))
              .map((country, index) => {
                return (
                  <article key={index} className='countryCard'>
                    <img
                      className='flag'
                      src={country.flags.svg}
                      alt={country.name}
                    />
                    <h3>{country.name.common}</h3>
                    {country.languages !== undefined && (
                      <ul>
                        {Object.values(country.languages).map(
                          (language, index) => (
                            <li key={index}>{language}</li>
                          )
                        )}
                      </ul>
                    )}
                  </article>
                );
              })}
        </div>
      </div>
    </section>
  );
};
