import React, { useState} from 'react'
import axios from 'axios';



export default function Register() {
    const [uName, setUName] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try{
            const res = await axios.post(`Home/createuser?username=${uName}&firstname=${fName}&lastname=${lName}&email=${email}&password=${password}`, 
            {
              
            })

            if(res.data){
                window.alert("Registration successful")
                window.location.replace("/")
            }
           
        }catch(err){
            console.log(err)
            setError(true)
        }
    }


    return (
        <div className='container'>
            <img className='logoImg' src="https://cdn.dribbble.com/users/1070235/screenshots/5325568/lightning_sewer_4x.png" alt="random logo" />
            <h1 className='text-center p-5'>Register Here!</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label className="form-label">User name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e) => setUName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e) => setFName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Last Name</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp" onChange={(e) => setLName(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="text" className="form-control"  aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-info">Register</button>
                <br />
                {error && <span style={{color:"red"}}>Something went wrong</span>}
            </form>

        </div>
    )
}
