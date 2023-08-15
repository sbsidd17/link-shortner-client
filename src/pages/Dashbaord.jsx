import React from 'react'
import { backendUrl } from "../config/config";


function Dashbaord({data}) {
  console.log(data);
  
  return (
    <div>
      <div>Welcome</div>
      <div className='flex flex-col p-3 text-white gap-5'>
      <ul>
      {
        data?.userLinks.map((link, index)=>{
          return (<li key={index}>
              <div className='flex justify-between items-center'>
                <a href={`${backendUrl}/${link.link.shortId}`}>{`${backendUrl}/${link.link.shortId}`}</a>
                <p>{`Total Clicks = ${link.link.totalClicks}`}</p>
              </div>
          </li>)
        })
      }
      </ul>
      </div>
    </div>
  )
}

export default Dashbaord