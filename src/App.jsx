import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { Error } from './pages/Error';
import { SearchPage } from './pages/SearchPage';
import logo from './assets/map(1).svg';
import {SlMenu} from 'react-icons/sl'
import {ImCross} from 'react-icons/im'

function App() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <Router>
        <nav className='navBar'>
          <img src={logo} alt='logo' className='navLogo' />
         
          <ul className='bigNav'>
            <li>
              <NavLink to='/'>Accueil </NavLink>
            </li>
            <li>
              <NavLink to='/search'> Recherche </NavLink>
            </li>
          </ul>
          <span className='smallNav'> 
          
            <button className='navToggle' onClick={()=>{setOpenNav(!openNav)}}>{!openNav ? <SlMenu/> : <ImCross/>}</button>
          </span>
          {openNav && 
          <ul className='sideNav'> 
            <li>
              <NavLink onClick={()=>{setOpenNav(false)}} to='/'>Accueil </NavLink>
            </li>
            <li>
              <NavLink onClick={()=>{setOpenNav(false)}} to='/search'> Recherche </NavLink>
            </li>
          </ul>
          }
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
