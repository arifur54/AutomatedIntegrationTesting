import axios from 'axios';
import React, { useState } from 'react'
import { useLocation} from 'react-router-dom';



export default function CreateTests() {
  const search = useLocation().search;
  const integrationId = new URLSearchParams(search).get('integrationId');
  // console.log(integrationId)

  const [optSelect, setOptSelect] = useState([])
  const [sequence, setSequence] = useState(0);
  const [label, setLabel] = useState("");
  const [elementId, setElementId] = useState(null);
  const [elementClass, setElementClass] = useState(null);
  const [elementHref, setElementHref] = useState(null);
  const [elementLinkText, setElementLinkText] = useState(null);
  const [elementSequence, setElementSequence] = useState(null);
  const [action, setAction] = useState(null);
  const [value, setValue] = useState("");
  const [isTransition, setIsTransition] = useState();
  const [isAssertion, setIsAssertion] = useState();
  const [url, setUrl] = useState(null);
  // const [elementValue, setElementValue] = useState("");
  // const [eleOptView, seteleOptView] = useState();
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    let baseURl = `Home/createtestcase?` 
    if(integrationId){
      baseURl += `integrationId=${integrationId}`
    }

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

    if(elementSequence){
      baseURl += `&elementSequence=${elementSequence}`
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
      const res = await axios.post(baseURl);
      if(res.data){
        window.alert(res.data.message);
        window.location.reload();

      }
    }catch(err){
      console.log(err);
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
    <div className='container mt-5'>
      <h1>Create Tests</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Sequence </label>
          <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onClick={selectedValue}>
            {
             optSelect.map((data) => (
                <option key={data} value={data} >{data}</option>
              ))
            }
          
          </select>
          {/* <input required type="text" className="form-control" aria-describedby="emailHelp" onChange={(e) => setSequence(e.target.value)} /> */}
        </div>
        <div className="mb-3">
          <label className="form-label">Label</label>
          <input required type="text" className="form-control" onChange={(e) => setLabel(e.target.value)} />
        </div>
        {/* <div className="dropdown mt-2 p-3">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" 
          data-bs-toggle="dropdown" aria-expanded="false">
            {eleOptView ? eleOptView : "Element"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><button className="dropdown-item" type="button" onClick={() => handleElement("id")}>Element ID</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => handleElement("class")}>Element Class </button></li>
            <li><button className="dropdown-item" type="button" onClick={() => handleElement("href")}>Element Href</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => handleElement("linktext")}>Element Link Text </button></li>
            <li><button className="dropdown-item" type="button" onClick={() => handleElement("sequence")}>Element Sequence </button></li>
          </ul>
        </div> */}
        <div className="mb-3">
                <label className="form-label">Element Id</label>
                <input type="text" className="form-control" onChange={(e) => setElementId(e.target.value)} />
        </div>
        <div className="mb-3">
                <label className="form-label">Element Class</label>
                <input type="text" className="form-control" onChange={(e) => setElementClass(e.target.value)} />
        </div>
        <div className="mb-3">
                <label className="form-label">Element Href</label>
                <input type="text" className="form-control" onChange={(e) => setElementHref(e.target.value)} />
        </div>
        <div className="mb-3">
                <label className="form-label">Element LinkText</label>
                <input type="text" className="form-control" onChange={(e) => setElementLinkText(e.target.value)} />
        </div>
        {/* <div className="mb-3">
                <label className="form-label">Element Sequence</label>
                <input type="text" className="form-control" onChange={(e) => setElementSequence(e.target.value)} />
        </div> */}

        <div className="dropdown mt-2 p-3">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
            data-bs-toggle="dropdown" aria-expanded="false">
            {action ? action :  "Action" }
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><button className="dropdown-item" type="button" onClick={() => setAction("Check Text")}>Check Text </button></li>
            <li><button className="dropdown-item" type="button" onClick={() => setAction("Click")}>Click</button></li>
            <li><button className="dropdown-item" type="button" onClick={() => setAction("Input Text")}>Input Text </button></li>
            <li><button className="dropdown-item" type="button" onClick={() => setAction("Element Exists")}>Element Exists  </button></li>
          </ul>
        </div>
        {action && (
              <div className="mb-3">
                <label className="form-label">Action Value</label>
                <input type="text" className="form-control" onChange={(e) => setValue(e.target.value)} />
              </div>
        )}

        <div className="dropdown mt-2 p-3">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" 
          data-bs-toggle="dropdown" aria-expanded="false">
            Is Transition
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><button className="dropdown-item" type="button" onClick={() => setIsTransition(true)}>True </button></li>
            <li><button className="dropdown-item" type="button" onClick={() => setIsTransition(false)}>False </button></li>
          </ul>
        </div>

        <div className="dropdown p-3">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
           Is Assertion
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><button className="dropdown-item" type="button"  onClick={() => setIsAssertion(true)}>True </button></li>
            <li><button className="dropdown-item" type="button"  onClick={() => setIsAssertion(false)}>False </button></li>
          </ul>
        </div>

        <div className="mb-3">
          <label className="form-label">Url</label>
          <input type="text" className="form-control" onChange={(e) => setUrl(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-success">Create Tests</button>
      </form>
    </div>
  )
}
