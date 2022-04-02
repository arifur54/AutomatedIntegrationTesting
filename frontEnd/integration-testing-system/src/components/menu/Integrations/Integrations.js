import React, {useEffect, useContext, useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Integrations() {
    const [res, setRes] = useState([])
    const { user } = useContext(Context);
    const navigate = useNavigate();


    useEffect(() => {
        const getIntegration = async() => {
            const res = await axios.get(`/Home/getintegrations?userId=${user.userId}`)
            console.log(res.data)
            setRes(res.data);
        }
        getIntegration()
    }, [])

    const handleDelete = (data) => {
        console.log("delete")
    }
    const handleEdit = (data) => {
        navigate(`/updateIntegration?integrationId=${data.integrationId}`)
    }
    const handletests = (data) => {
        navigate(`/createTests?integrationId=${data.integrationId}`)
       
    }

  return (
    <div className='container'>
        <h1>Integrations</h1>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Integration ID</th>
                        <th scope="col">User Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created On</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                { res.map((data, i) => (
                
                        <tr key={i}>
                            <td scope="row">{data.integrationId}</td>
                            <td scope="row">{data.userId }</td>
                            <td scope="row">{data.name }</td>
                            <td scope="row">{data.description}</td>
                            <td scope="row">{data.dateCreated }</td>
                            <td scope="row">
                                <button className='btn btn-primary m-2' onClick={() => handletests(data)}>
                                    Create tests
                                </button>
                                <button className='btn btn-primary m-2' onClick={() => handleEdit(data)}>
                                    Edit
                                </button>
                                <button className='btn btn-danger' onClick={() => handleDelete(data)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                ))}
                  </tbody>
            </table>
        <button className='btn btn-info'>
            <Link to="/createIntegration">
                + Create Integration
            </Link>
        </button>
    </div>
  )
}
