import React, {useState, useContext} from 'react'
import './login.css';
import { Context } from '../context/Context';
import axios from 'axios';


export default function Login() {
  const [user, setUserState] = useState("");
  const [password, setPassState] = useState("");
  const {dispatch, isFetching} = useContext(Context);

  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try{
      const res = await axios.post(`Home/login?username=${user}&password=${password}`,{})
      console.log(res.data)
      if(res.data){
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        // window.location.replace("/menu")
      }
      console.log(res)
    }catch(err){
      console.log(err)
      dispatch({type: "LOGIN_FAILURE"})
    }

  }



  return (
    <div className='container'>
        <img className='logoImg' src ="https://cdn.dribbble.com/users/1070235/screenshots/5325568/lightning_sewer_4x.png" alt="random logo" />
        <h1 className='text-center p-5'>Welcome to Integration Testing!</h1>
        <h6 className='text-center'>Your Online Soluation to .......</h6>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" required aria-describedby="emailHelp" onChange={(e) => setUserState(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" required  onChange={(e) => setPassState(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">login</button>
        </form>
    </div>
  )
}
