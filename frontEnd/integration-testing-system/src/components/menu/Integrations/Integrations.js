import React, {useEffect, useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';

export default function Integrations() {
    const [res, setRes] = useState([])
    const [modalData, setModalData] = useState();
    const [editError, setEditError] = useState("");
    const [name, setIntName] = useState("");
    const [desc, setIntDesc] = useState("");
    const [showName, setShowName ] = useState("");
    const [showDesc, setShowDesc ] = useState("")
    const [noData, setNoData] = useState(false)
    const { user } = useContext(Context);
    const navigate = useNavigate();


    useEffect(() => {
        const getIntegration = async() => {
            try{
                const res = await axios.get(`/Home/getintegrations?userId=${user.userId}`)
                if(res.data.length === 0){
                    setNoData(true)
                }else{
                    setRes(res.data); 
                    setNoData(false)
                }

            }catch(err){
                console.log(err)
            }
        }
        getIntegration()
        
    }, [user.userId])

    const handleDelete = async (data) => {
        let x = window.confirm("Are you sure you want to delete this Integration");
        if (x) {
            try {
                const res = await axios.delete(`Home/deleteintegration?id=${data.integrationId}`)
                if (res.data) {
                    window.alert("This integration has been deleted");
                    window.location.reload();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    const handleEdit = async(modalData) => {
        try {
            const res = await axios.put(`Home/updateintegration?id=${modalData.integrationId}&name=${name}&description=${desc}`);
            if (res) {
                setEditError(res.data.message);
            }
       }catch(err){
            setEditError(err)
       }
    }
    const handletests = (data) => {
        navigate(`/tests?integrationId=${data.integrationId}`)   
    }

    const handleShow = (data) => {
        setModalData(data)
        setShowName(data.name);
        setShowDesc(data.description);
    }

    const handleClose = () => {
        window.location.reload()
    }
  return (
    <div className='container'>
        { noData ? (
        <div>
            <h2 className='m-5'>Please Create Integration to continue.....</h2>
        </div>
            ) : (
        <div>
        <h1>Integrations</h1>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Integration ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created On</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                { res.map((data, i) => (
                
                        <tr key={i}>
                            <td>{data.integrationId}</td>
                            <td>{data.name }</td>
                            <td>{data.description}</td>
                            <td>{new Date(data.dateCreated).toDateString()}</td>
                            <td>
                                <button className='btn btn-primary m-2' onClick={() => handletests(data)}>
                                    Create tests
                                </button>
                                <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleShow(data)}>
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
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Edit Integration</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <form onSubmit={() => handleEdit(modalData)}>
                                  <div className="mb-3">
                                      <label className="formName-label">Integration Name</label>
                                      <input required type="text" className="form-control"  onChange={(e) => setIntName(e.target.value)} placeholder={showName} />
                                  </div>
                                  <div className="mb-3">
                                      <label className="form-label">Integration Description</label>
                                      <input required type="text" className="form-control" onChange={(e) => setIntDesc(e.target.value)} placeholder={showDesc} />
                                  </div>
                                  <button type="submit" className="btn btn-info">Save changes</button>
                          </form>
                          <span>{editError}</span>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
   
                      </div>
                  </div>
              </div>
          </div>
          </div>
          )}
        <button className='btn'>
            <Link className='link' to="/createIntegration">
                + Create Integration
            </Link>
        </button>
    </div>
  )
}
