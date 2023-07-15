import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RiSpeakLine } from 'react-icons/ri';
import { Loading } from '../components/Loading';
const urlAllCountries = 'https://restcountries.com/v3.1/all';

export const Home = () => {
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(6);

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

  if (isLoading || countries === null) return <Loading/>;

  return (
    <section className='homeSection'>
      <div>
        <h2>Countries around the world</h2>
        <div className='countriesSection'>
          {countries !== null &&
            countries.slice(0, pageCount).map((country, index) => {
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
                          <li key={index}>
                            <RiSpeakLine color='aquamarine'/>{" "}
                            {language}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </article>
              );
            })}
        </div>
      </div>
      <button
        className='showMoreBtn'
        onClick={() => setPageCount(pageCount + 6)}
      >
        Show me more
      </button>
    </section>
  );
};
