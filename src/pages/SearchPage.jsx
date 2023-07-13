import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const urlAllCountries = 'https://restcountries.com/v3.1/all';

export const SearchPage = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const newCountriesTab = [...countries];

  const getAllCountries = async () => {
    setIsLoading(true);
    try {
      axios.get(urlAllCountries).then((response) => {
        setCountries(response.data);
        setIsLoading(false);
        // console.log(newCountriesTab.filter((country) =>
        //   country.name.includes(searchValue.toLowerCase())));
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getAllCountries();
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filterCountriesTab = newCountriesTab.filter((country) =>
    country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  );

  // {
  //   filterCountriesTab.length >= 1 &&
  //     console.log(
  //       newCountriesTab.filter((country) =>
  //         country.name.common.includes(searchValue)
  //       )
  //     );
  // }

  if (isLoading || countries === null) return <h2>chargement en cours</h2>;

  return (
    <section className='homeSection'>
      <div>
        <h2>Page de recherche</h2>
        <input
          type='text'
          className='searchInput'
          value={searchValue}
          onChange={handleChange}
          placeholder='Chercher un pays'
        />
        <div className='countriesSection'>
          {filterCountriesTab.length >= 1 ? (
            filterCountriesTab.map((country, index) => {
              return (
                <article key={index} className='countryCard'>
                  <Link to={country.maps.googleMaps} target='blank'>
                    <img
                      className='flag'
                      src={country.flags.svg}
                      alt={country.name}
                    />
                    <h3>{country.name.common}</h3>
                  </Link>
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
            })
          ) : (
            <h2>pas de résultats</h2>
          )}
        </div>
      </div>
    </section>
  );
};
