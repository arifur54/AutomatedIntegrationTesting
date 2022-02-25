import React from 'react'
import AccountInfo from './account-info/Accountinfo'
import Integration from './Integration/Integration'

export default function menu() {
  return (
    <div className='container text-center'>
        <h1>Menu ITEMS</h1>
        <div className='row m-5'>
            <div className='col-6'>
                <button type="button" className="btn btn-primary btn-lg">Account Info</button>
            </div>
            <div className='col-6'>
                <button type="button" className="btn btn-success btn-lg">Integration</button>
            </div>
        </div>
        <div className='row m-5'>
            <div className='col-6'>
                <button type="button" className="btn btn-warning btn-lg">Testing</button>
            </div>
            <div className='col-6'>
                <button type="button" className="btn btn-info btn-lg">Data</button>
            </div>
        </div>

        {/* <AccountInfo /> */}
        {/* <Integration /> */}
    </div>
  )
}
