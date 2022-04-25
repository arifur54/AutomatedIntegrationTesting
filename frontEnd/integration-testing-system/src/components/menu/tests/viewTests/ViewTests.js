import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';


export default function ViewTests() {
    const search = useLocation().search;
    const integrationId = new URLSearchParams(search).get('integrationId');
    const [testsData, setTestsData] = useState([]);
   
    const [optSelect, setOptSelect] = useState([])
    const [sequence, setSequence] = useState(0);
    const [label, setLabel] = useState("");
    const [elementId, setElementId] = useState("");
    const [elementClass, setElementClass] = useState("");
    const [elementHref, setElementHref] = useState("");
    const [elementLinkText, setElementLinkText] = useState("");
    const [testResult, setTestResult] = useState([]);
    const [action, setAction] = useState("");
    const [value, setValue] = useState("");
    const [isTransition, setIsTransition] = useState();
    const [isAssertion, setIsAssertion] = useState();
    // const [eleOptView, seteleOptView] = useState();
    const [url, setUrl] = useState("");

    const [modalData, setModalData] = useState()


    const getTests = async () => {
        try {
            const res = await axios.get(`Home/gettestcases?integrationId=${integrationId}`)
            console.log(res.data)
            setTestsData(res.data)

        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        getTests();
    }, [])

 

    const handleDelete = async(data) => {
        let x = window.confirm("Are you sure you want to delete this test?")
        if(x){
            try{
                const res = await axios.delete(`Home/deletetestcase?id=${data.testCaseId}`)
                if(res.data){
                    getTests();
                }
            }catch(err){
                console.log(err)
            }
        }
    
    }

    const handleShow = (data) => {
        setModalData(data)
        setSequence(data.sequence);
        setLabel(data.label);
        setElementId(data.elementId);
        setElementClass(data.elementClass);
        setElementHref(data.elementHref);
        setElementLinkText(data.elementLinkText);

        // if(data.elementId === "id"){
        //     seteleOptView("Element ID")
        // }else if(data.elementClass === "class"){
        //     seteleOptView("Element Class")
        // }else if(data.elementSequence === "sequence"){
        //     seteleOptView("Element Sequence")
        // }
        setAction(data.action);
        setValue(data.value);
        setIsTransition(data.isTransition.toString());
        setIsAssertion(data.isAssertion.toString());
        setUrl(data.url)
    }




    const handleEdit = async(data) => {
    
    let baseURl = `Home/updatetestcase?id=${data.testCaseId}`

    if(sequence){
        baseURl += `&sequence=${sequence}`
      }
  
      if(label){
        baseURl += `&label=${label}`
      }
  
      if(elementId){
        baseURl += `&elementId=${elementId}`
      }
  
      if(elementClass){
        baseURl += `&elementClass=${elementClass}`
      }
  
      if(elementHref){
        baseURl += `&elementHref=${elementHref}`
      }
  
      if(elementLinkText){
        baseURl += `&elementLinkText=${elementLinkText}`
      }
  
      if(action){
        baseURl += `&action=${action}`
      }
  
      if(value){
        baseURl += `&value=${value}`
      }
  
      if(isTransition){
        baseURl += `&isTransition=${isTransition}`
      }
  
      if(isAssertion){
        baseURl += `&isAssertion=${isAssertion}`
      }
  
      if(url){
        baseURl += `&url=${url}`
      }
  
        try{
            const res = await axios.put(baseURl)
            if(res.data){
              window.alert(res.data.message);
              window.location.reload();
            }

        }catch(err){
            console.log(err)
        }
    }

    const handleClose = () => {
        window.location.reload()
    }

    const handleRunTest = async() => {
        try{
            const res = await axios.put(`Home/runintegration?id=${integrationId}&delayinseconds=2`)
            if(res.data){
                setTestResult(res.data);
            }
           
        }catch(err){
            console.log(err)
        }
    }


    const selectedValue = (e) => {
        let selected = [];
        for(let x = 1; x < 100; x++){
          selected.push(x)
        }
        setOptSelect(selected);
        setSequence(e.target.value)
        //return selected;
      }
 
  return (
      <div className='container'>
          <table className="table table-striped table-dark">
              <thead>
                  <tr>
                      <th scope="col">Squence</th>
                      <th scope="col">Lable</th>
                      <th scope="col">Element Id</th>
                      <th scope="col">Element Class</th>
                      <th scope="col">Element Href</th>
                      <th scope="col">Element LinkText</th>
                      {/* <th scope="col">Element Sequence</th> */}
                      <th scope="col">Action</th>
                      <th scope="col">Value</th>
                      <th scope="col">Is Transition</th>
                      <th scope="col">Is Assertion</th>
                      <th scope="col">url</th>
                      <th scope="col">User Action</th>
                  </tr>
              </thead>
              <tbody>
                  {testsData.map((data, i) => (
                      <tr key={i}>
                          <th>{data.sequence}</th>
                          <td>{data.label}</td>
                          <td>{data.elementId}</td>
                          <td>{data.elementClass}</td>
                          <td>{data.elementHref}</td>
                          <td>{data.elementLinkText}</td>
                          {/* <td>{data.elementSequence}</td> */}
                          <td>{data.action}</td>
                          <td>{data.value}</td>
                          <td>{data.isTransition.toString()}</td>
                          <td>{data.isAssertion.toString()}</td>
                          <td>{data.url}</td>
                          <td>
                            <button type="button" className="btn btn-primary m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleShow(data)}>
                                   Edit
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(data)}>
                                Delete
                            </button>
                          </td>
                      </tr>
                      
                  ))}
              </tbody>
          </table>
          {testResult.map((data, i) => (
              
              <h4 style={{'color': "green"}} key={i}>
                 {data}
                </h4>
          ))}
          <div className='row'>
            <div className='col-4'>

            </div>
            <div className='col-4'>
                
            </div>
            <div className='col-4'>
                <button type="button" className="btn-lg btn-success" onClick={() => handleRunTest()}>
                    Run Test {integrationId}
                </button>
            </div>
          </div>

          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Edit Tests </h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <form>
                                  <div className="mb-3">
                                      <label className="formName-label">Sequence</label>
                                        <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onClick={selectedValue}>
                                            {
                                                optSelect.map((data) => (
                                                    <option key={data} value={data} >{data}</option>
                                                ))
                                            }

                                        </select>
                                      {/* <input required type="text" className="form-control"  onChange={(e) => setSequence(e.target.value)} placeholder={sequence} /> */}
                                  </div>
                                  <div className="mb-3">
                                      <label className="form-label">Label</label>
                                      <input required type="text" className="form-control" onChange={(e) => setLabel(e.target.value)} placeholder={label}/>
                                  </div>
                                    {/* <div className="dropdown mt-2 p-3">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            {eleOptView ? eleOptView : "Element"}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button className="dropdown-item" type="button" onClick={() => handleElement("id")}>Element ID</button></li>
                                            <li><button className="dropdown-item" type="button" onClick={() => handleElement("class")}>Element Class </button></li>
                                            <li><button className="dropdown-item" type="button" onClick={() => handleElement("sequence")}>Element Sequence </button></li>
                                        </ul>
                                    </div> */}
                              <div className="mb-3">
                                  <label className="form-label">Element Id</label>
                                  <input type="text" className="form-control" placeholder={elementId} onChange={(e) => setElementId(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                  <label className="form-label">Element Class</label>
                                  <input type="text" className="form-control" placeholder={elementClass} onChange={(e) => setElementClass(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                  <label className="form-label">Element Href</label>
                                  <input type="text" className="form-control" placeholder={elementHref} onChange={(e) => setElementHref(e.target.value)} />
                              </div>
                              <div className="mb-3">
                                  <label className="form-label">Element LinkText</label>
                                  <input type="text" className="form-control" placeholder={elementLinkText} onChange={(e) => setElementLinkText(e.target.value)} />
                              </div>
                              {/* <div className="mb-3">
                                  <label className="form-label">Element Sequence</label>
                                  <input type="text" className="form-control" onChange={(e) => setElementSequence(e.target.value)} />
                              </div> */}

                                    <div className="dropdown mt-2 p-3">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            {action ? action : "Action"}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button className="dropdown-item" type="button" onClick={() => setAction("Check Text")}>Check text </button></li>
                                            <li><button className="dropdown-item" type="button" onClick={() => setAction("Click")}>Click  </button></li>
                                            <li><button className="dropdown-item" type="button" onClick={() => setAction("Input Text")}>Input Text  </button></li>
                                            <li><button className="dropdown-item" type="button" onClick={() => setAction("Element Exists")}>Element Exists  </button></li>
                                        </ul>
                                    </div>
                                    {action && (
                                        <div className="mb-3">
                                            <label className="form-label">Value</label>
                                            <input required type="text" className="form-control" placeholder={value} onChange={(e) => setValue(e.target.value)} />
                                        </div>
                                    )}
   
                                    <div className="dropdown mt-2 p-3">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            {isTransition ? isTransition : "Is Transition"}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button className="dropdown-item" type="button" onClick={() => setIsTransition(true)}>True </button></li>
                                            <li><button className="dropdown-item" type="button" onClick={() => setIsTransition(false)}>False </button></li>
                                        </ul>
                                    </div>

                                    <div className="dropdown p-3">
                                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                            {isAssertion ? isAssertion : "Is Assertion"}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button className="dropdown-item" type="button" onClick={() => setIsAssertion(true)}>True </button></li>
                                            <li><button className="dropdown-item" type="button" onClick={() => setIsAssertion(false)}>False </button></li>
                                        </ul>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Url</label>
                                        <input required type="text" className="form-control" placeholder={url} onChange={(e) => setUrl(e.target.value)} />
                                    </div>
                                   
                          </form>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                          <button type="submit" className="btn btn-info" onClick={() => handleEdit(modalData)}>Save changes</button>              
                      </div>
                  </div>
              </div>
          </div>
          
      </div>
  )
}
