import React from 'react';
import Routes from '../../routes';
import {Link } from 'react-router-dom'

export default function Header() {
  return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <Link className="navbar-brand" to='/'>AITS</Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                      <ul className="navbar-nav  mx-lg-auto text-center">
                          <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to='/'>Login</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to='/register'>Register</Link>
                          </li>
        
                      </ul>
                  </div>
              </div>
          </nav>
          <div>
            <Routes />
          </div>
          
      </div>
  )
}
