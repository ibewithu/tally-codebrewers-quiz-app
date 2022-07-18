import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const Navbar = () => {
  let location = useLocation();
  const [cookies, setCookie] = useCookies(['userId'])


  const navigate = useNavigate();
  const handleLogout = ()=>{
    setCookie('userId', '', {path: '/'})
    navigate('/', { replace: true })
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          myQuiz
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link className={`nav-link ${location.pathname==='/'} ? 'active' : '' `} aria-current='page' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className={`nav-link ${location.pathname==='/about'} ? 'active' : '' `}  to='/about'>
                About
              </Link>
            </li>
          </ul>
          {!cookies.userId ? <form>
              <Link className='btn btn-primary mx-1' to='/auth/register'>
                Register
              </Link>
              <Link className='btn btn-primary mx-1' to='/auth/login'>
                Login
              </Link>
          </form> : <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
