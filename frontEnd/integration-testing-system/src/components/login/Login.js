import React from 'react'
import './login.css'

export default function Login() {
  return (
    <div className='container'>
        <img className='logoImg' src ="https://cdn.dribbble.com/users/1070235/screenshots/5325568/lightning_sewer_4x.png" alt="random logo" />
        <h1 className='text-center p-5'>Welcome to Integration Testing!</h1>
        <h6 className='text-center'>Your Online Soluation to .......</h6>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">login</button>
        </form>
    </div>
  )
}
