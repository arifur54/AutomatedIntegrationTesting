import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Menu from './components/menu/Menu'
import CreateIntegration from './components/menu/Integrations/createIntegration/CreateIntegration';
import UpdateIntegration from './components/menu/Integrations/updateIntegration/UpdateIntegration';
import Tests from './components/menu/tests/Tests';
import { Context } from './components/context/Context';


function Routess() {
  const {user} = useContext(Context)
  return (
    <div>
        <Routes>
            <Route path="/" element={user? <Menu /> : <Login />} />
            <Route path="/register" element={user? <Menu />: <Register/>} />
            <Route path="/menu" element={user? <Menu /> : <Login />} />
            <Route path="/createIntegration" element={user? <CreateIntegration />: <Login />} />
            <Route path="/updateIntegration" element={user? <UpdateIntegration /> : <Login /> } />
            <Route path="/tests" element={user? <Tests /> : <Login /> } />
        </Routes>
    </div>
  )
}

export default Routess;