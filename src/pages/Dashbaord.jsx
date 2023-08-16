import React from 'react'
import { backendUrl } from "../config/config";
import { useEffect } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { useState } from 'react';


function Dashbaord() {
  const [data, setData] = useState()

  useEffect(()=>{
    const jwtToken = localStorage.getItem("jwtToken")
    async function fetchData(){
      try {
        const response = await axios.post(
          `${backendUrl}/user/dashboard`, {jwtToken},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(response.data.msg);
        setData(response.data.data)

      } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error.message)
      }
    }

    fetchData()
  },[])


  
  return (
    <div>
      <div>Welcome</div>
      <div className='flex flex-col p-3 text-white gap-5'>
      <ul>
      {
        data?.userLinks.map((link, index)=>{
          return (<li key={index}>
              <div className='flex justify-between items-center'>
                <a href={`${backendUrl}/${link.link.shortId}`} target="_blank" rel="noreferrer">{`${backendUrl}/${link.link.shortId}`}</a>
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