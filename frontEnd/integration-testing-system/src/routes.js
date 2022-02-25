import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Menu from './components/menu/menu'

function routes() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<Menu />} />
        </Routes>
    </div>
  )
}

export default routes;