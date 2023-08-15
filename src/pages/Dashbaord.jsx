import React from 'react'
import { useEffect } from 'react'
import axios from "axios";

function Dashbaord() {

  useEffect(()=>{
    async function fetchData(){
      try {
        const response = await axios.get(
          "https://sdlinks.onrender.com/user/dashboard",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData()
  },[])
  return (
    <div>Dashbaord</div>
  )
}

export default Dashbaord