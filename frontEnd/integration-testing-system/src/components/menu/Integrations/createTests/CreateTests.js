import React from 'react'
import { useLocation } from 'react-router-dom'

export default function CreateTests() {
    const search = useLocation().search;
    const integrationId = new URLSearchParams(search).get('integrationId');
    console.log(search, integrationId)
  return (
    <div className='container'>
        <div>

        </div>
    </div>
  )
}
