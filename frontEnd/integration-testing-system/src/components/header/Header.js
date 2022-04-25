import React, {useContext} from 'react';
import Routess from '../../Routess';
import {Link } from 'react-router-dom'
import { Context } from '../context/Context';

export default function Header() {
  const {user, dispatch} = useContext(Context)

  const handleClick = () => {
    window.location.replace(`http://localhost:3000`)
    dispatch({type: "LOGOUT"})
  }
  return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <Link className="navbar-brand" to='/'>ASIT</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav  mx-lg-auto text-center">
                        {user ? (<div>
                          <h6>Welcome: {`${user.firstName} ${user.lastName}`}</h6>
                            <button type='button' className="nav-item btn btn-warning" onClick={handleClick}>
                              Logout
                            </button>
                          </div>) : 
                          (
                            <div>
                              <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to='/'>Login</Link>
                              </li>
                              <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to='/register'>Register</Link>
                              </li>
                            </div>
                          )
                          
                        }
                      </ul>
                  </div>
              </div>
          </nav>
          <div>
            <Routess />
          </div>
          
      </div>
  )
}
