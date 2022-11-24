import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios'

const Clients = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    const fetchAllClients = async () => {
      try{
        const res = await axios.get("http://localhost:5000/clients")
        console.log(res)
      }catch(err){
        console.log(err);
      }
    }
    fetchAllClients();
  }, [])
  return (
    <div>Clients</div>
  )
}

export default Clients