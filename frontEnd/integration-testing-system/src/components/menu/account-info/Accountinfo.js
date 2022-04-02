import React, { useState, useContext } from 'react';
import { Context } from '../../context/Context';

import axios from 'axios';
export default function AccountInfo() {
    const [uName, setUName] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const { user, dispatch } = useContext(Context)
    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch({type: "UPDATE_START"});
        try{
            const res = await axios.put(`Home/updateuser?id=${user.userId}&username=${uName}&firstname=${fName}&lastname=${lName}&email=${email}`, {});
            if(res.data){
               window.alert("Your account information has been updated, please login again to see the changes.. :)") 
               dispatch({type: "LOGOUT"});
            }
        }catch(err){
            dispatch({type: "UPDATE_FAILURE"});
            console.log(err)
        }
    }

    const handleDelete = (e) =>{
        e.preventDefault()
        let x = window.confirm("Are you sure that you want to delete this account?")
        if(x){
            try{
                axios.delete(`/Home/deleteuser?id=${user.userId}`)
                window.alert("your account has been deleted, you will now be logged out")
                dispatch({type: "LOGOUT"});
            }catch(err){
                console.log(err)
            }
        }
        
    }

  return (
        <div className='container'>
            <h1 className='text-center p-5'>Account Information</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" placeholder={user.username} onChange={(e) => setUName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" placeholder={user.firstName} onChange={(e) => setFName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" placeholder={user.lastName} onChange={(e) => setLName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="text" className="form-control" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control"  onChange={(e) => setPassword(e.target.value)} />
                </div> */}
                {/* <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" />
                </div> */}
                <button type="submit" className="btn btn-info m-2">Update Information</button>
                <button className="btn btn-danger m-3 float-md-left" onClick={handleDelete} >Delete Account</button>
            </form>
        </div>
    
    )
}
