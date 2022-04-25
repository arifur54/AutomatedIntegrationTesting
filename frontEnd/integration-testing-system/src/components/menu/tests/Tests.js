import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import CreateTests from './createTests/CreateTests';
import ViewTests from './viewTests/ViewTests';

export default function Tests() {
    const search = useLocation().search;
    const integrationId = new URLSearchParams(search).get('integrationId');
    const [pageState, setPageState] = useState("View");

    return (
        <div>
            <div className='container text-center'>
                <h1>Menu ITEMS</h1>
                <div className='row m-5'>
                    <div className='col-6'>
                        <button type="button" className="btn btn-primary btn-lg" onClick={() => setPageState("View")} >View Tests</button>
                    </div>
                    <div className='col-6'>
                        <button type="button" className="btn btn-success btn-lg" onClick={() => setPageState("Create")} >Create Tests</button>
                    </div>
                </div>
                {pageState === 'View' && <ViewTests />}
                {pageState === 'Create' &&  <CreateTests /> }
            </div>
        </div>
    )
}
