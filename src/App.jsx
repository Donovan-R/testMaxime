import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { Error } from './pages/Error';
import { SearchPage } from './pages/SearchPage';

import logo from './assets/map(1).svg';

function App() {
  return (
    <>
      <Router>
        <nav className='navBar'>
          <img src={logo} alt='logo' className='navLogo' />

          <ul>
            <li>
              <NavLink to='/'>Accueil </NavLink>
            </li>
            <li>
              <NavLink to='/search'> Recherche </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
