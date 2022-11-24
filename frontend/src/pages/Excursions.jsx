import React from 'react'
import {NavLink} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Table, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import AuthContext from "../context/AuthProvider";

const Excursion = () => {

  const {auth} = useContext(AuthContext);
  
  const [excursions, setExcursions] = useState([])
  var reqKey = [];

  useEffect(() => {
    const fetchAllExcursions = async () => {
      try{
        const res = await axios.get("http://localhost:5000/excursions")
        setExcursions(res.data)
          var columnsIn = res.data[0]; 
          for(var key in columnsIn){
            reqKey.push(key) // here is your column name you are looking for
          } 
      }catch(err){
        console.log(err);
      }
    }
    fetchAllExcursions()
  }, []);
  
  
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/excursions/delete/"+id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (id) => {
    try {
      await axios.delete("http://localhost:5000/excursions/delete/"+id)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {auth.user ? 
      (
          <div className="display-page-wrapper"> 
            <h1>Excursii Planificate</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID_Excursie</th>
                  <th>ID_Locatie</th>
                  <th>ID_Hotel</th>
                  <th>ID_Firma_Transport</th>
                  <th>ID_Manager</th>
                  <th>Data_Plecare</th>
                  <th>Durata</th>
                  <th>Locuri</th>
                  <th>Pret</th>
                </tr>
              </thead>
              <tbody>
                {excursions.map((excursion) => (
                  <tr key={excursion.ID_Excursie}>
                    <td>{excursion.ID_Excursie}</td>
                    <td>{excursion.ID_Locatie}</td>
                    <td>{excursion.ID_Hotel}</td>
                    <td>{excursion.ID_Firma_Transport}</td>
                    <td>{excursion.ID_Manager}</td>
                    <td>{excursion.Data_Plecare}</td>
                    <td>{excursion.Durata}</td>
                    <td>{excursion.Locuri}</td>
                    <td>{excursion.Pret}</td>
                    <td>
                      <Button className="btn btn-delete" variant="outline-primary" onClick={() => {handleDelete(excursion.ID_Excursie)}}>Delete</Button>
                      <NavLink to={`/excursions/update/${excursion.ID_Excursie}`}><Button className="btn btn-update" variant="outline-secondary">Update</Button></NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="div-control-btn">
              <NavLink to="/excursions/add"><Button variant="primary">Creeaza excursie noua</Button></NavLink>
              <NavLink to="/clients/add"><Button variant="primary">Creeaza client nou</Button></NavLink>
            </div>
          </div>
          
      ):(
        <div className="display-page-wrapper">
          <h1>You are not loged in😔</h1>
          <div className="div-control-btn">
                <NavLink to="/login"><Button variant="primary">Login</Button></NavLink>
                <NavLink to="/register"><Button variant="primary">Creeaza un cont nou</Button></NavLink>
          </div>
        </div>
      )}
    </div>
  )
}

export default Excursion