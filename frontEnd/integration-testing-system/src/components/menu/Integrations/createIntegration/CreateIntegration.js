import React, {useState, useContext} from 'react';
import { Context } from '../../../context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateIntegration() {
    const [name, setIntName] = useState("");
    const [desc, setIntDesc] = useState("");
    const [error, setError] = useState(false);
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(`name ${name}, desc ${desc}`)
        try{
            const res = await axios.post(`Home/createintegration?userId=${user.userId}&name=${name}&description=${desc}`)
            if(res.data){
                setError(false);
                window.alert("Integration added successfully")
                navigate("/menu")
            }
        }catch(err){
            setError(true);
        }

    }
    
    return (
    <div className='container mt-5'>
        <h1>Create Integration</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Integration Name</label>
            <input required type="text" id='intgr2' className="form-control" aria-describedby="emailHelp" onChange={(e) => setIntName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Integration Description</label>
            <input required type="text" id='intgr' className="form-control"  onChange={(e) => setIntDesc(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success">Create Integration</button>
        </form>
        {error && (<span style={{color:"red"}}>Unable to Create Integration, Something went wrong</span>)}
        
    </div>
  )
}
