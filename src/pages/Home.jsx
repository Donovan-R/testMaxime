import { useState, useEffect } from 'react';
import axios from 'axios';
const urlAllCountries = 'https://restcountries.com/v3.1/all';

export const Home = () => {
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(6);

  useEffect(() => {
    axios.get(urlAllCountries).then((response) => {
      setCountries(response.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || countries === null) return <h2>chargement en cours</h2>;

  return (
    <section className='homeSection'>
      <div>
        <h2>Countries around the world</h2>
        <div className='countriesSection'>
          {countries !== null &&
            countries.slice(0, pageCount).map((country, index) => {
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
      <button
        className='showMoreBtn'
        onClick={() => setPageCount(pageCount + 6)}
      >
        Show me more
      </button>
    </section>
  );
};

//    const getData = async () => {
// 	const response = await axios.get(urlAllCountries);
//     setCountries(response.data)
//     console.log(countries[0]);
//     setIsLoading(false)
// };

// useEffect(()=>{
//  getData()
// },[])

//    const getAllCountries = async ()=>{
//         try {
//            const res = await axios.get(urlAllCountries)
//            const countriesGet = await res.data
//            setCountries({...countriesGet})
//             console.log(countries);
//             setIsLoading(false)
//         } catch (error) {
//             console.log(error);
//         }
//    }
//   getAllCountries()
