import React, {useState} from 'react'
import AccountInfo from './account-info/Accountinfo'
import Integration from './Integrations/Integrations'

export default function Menu() {
  const [active, setPageState] = useState("integration");  
  
  return (
    <div className='container text-center'>
        <h1>Menu ITEMS</h1>
        <div className='row m-5'>
            <div className='col-6'>
                <button type="button" className="btn btn-primary btn-lg" onClick={()=> setPageState("account")} >Account Info</button>
            </div>
            <div className='col-6'>
                <button type="button" className="btn btn-success btn-lg" onClick={()=> setPageState("integration")} >Integration</button>
            </div>
        </div>
       

    {active==="account" && <AccountInfo />}
    {active==="integration" && <Integration />}
    </div>
  )
}
