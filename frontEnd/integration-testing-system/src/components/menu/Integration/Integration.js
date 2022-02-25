import React from 'react'

export default function Integration() {
  return (
    <div className='container'>
        <h1>Integrations</h1>
        <button className='btn btn-info text-light w-100 p-3 m-3'>
            <div className='row'>
                <div className='col-3'>
                    <h6 className='text-light'>Hotmail</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>30 tests</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>120 Controls</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>3 Transitions</h6>
                </div>
            </div>
        </button>
        <button className='btn btn-info text-light w-100 p-3 m-3'>
            <div className='row'>
                <div className='col-3'>
                    <h6 className='text-light'>Yahoo</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>39 tests</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>47 Controls</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>4 Transitions</h6>
                </div>
            </div>
        </button>
        <button className='btn btn-info text-light w-100 p-3 m-3'>
            <div className='row'>
                <div className='col-3'>
                    <h6 className='text-light'>Gmail</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>21 Tests</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>55 Controls</h6>
                </div>
                <div className='col-3'>
                    <h6 className='text-light'>6 Transitions</h6>
                </div>
            </div>
        </button>
        <button className='btn btn-info'>
            + Add new Integration
        </button>
    </div>
  )
}
