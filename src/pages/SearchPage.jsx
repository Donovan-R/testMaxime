import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { RiSpeakLine } from 'react-icons/ri';
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

  // const filterCountriesTab = newCountriesTab.filter((country) =>
  //   country.name.common.toLowerCase().includes(searchValue.toLowerCase())
  // );

  const filterCountriesByLanguages = newCountriesTab.filter((country)=>country.languages !== undefined && Object.values(country.languages).toString().toLowerCase().includes(searchValue.toLowerCase()))

  

  if (isLoading || countries === null) return <Loading/>;

  return (
    <section className='homeSection'>
      <div>
        <h2>Page de recherche</h2>
        <input
          type='text'
          className='searchInput'
          value={searchValue}
          onChange={handleChange}
          placeholder='Chercher une langue'
        />
        <div className='countriesSection'>
          {!searchValue ? newCountriesTab.map((country, index) => {
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
                  {(country.languages !== undefined) ? (
                    <ul>
                      {Object.values(country.languages).map(
                        (language, index) => (
                          <li key={index}>
                            <RiSpeakLine color='aquamarine'/>{" "}
                            {language}
                          </li>
                        )
                      )}
                    </ul> 
                  ) : (
                    <h3>no languages found</h3>
                  )
                }
                </article>
          )})  : filterCountriesByLanguages.length >= 1 ? (
            filterCountriesByLanguages.map((country, index) => {
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
                  {(country.languages !== undefined) ? (
                    <ul>
                      {Object.values(country.languages).map(
                        (language, index) => (
                          <li key={index}>
                            <RiSpeakLine color='aquamarine'/>{" "}
                            {language}
                          </li>
                        )
                      )}
                    </ul> 
                  ) : (
                    <h3>no languages found</h3>
                  )
                }
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
