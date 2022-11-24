import React from 'react'
import {useState} from 'react'
import {Form,Button,Col,Row,Alert} from "react-bootstrap"
import {NavLink, useNavigate} from "react-router-dom"
import axios from "axios"

const AddExcursion = () => {
  const [requestSuccess, setRequestSuccess] = useState([]);
  const [excursion, setExcursion] = useState({
    ID_Excursie:null,
    ID_Locatie:null,
    ID_Hotel:null,
    ID_Manager:null,
    ID_Firma_Transport:null,
    Data_Plecare:"",
    Durata:null,
    Locuri:null,
    Pret:null
  });

  const handleChange = (e) => {
    //???
    setExcursion(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/excursions", excursion)
      setRequestSuccess(1);
    }catch(err){
      console.log(err);
    }
  }
  console.log(excursion);
  return (
    <div className="display-page-wrapper">
      <Form>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridID_Excursie">
          <Form.Label>ID_Excursie</Form.Label>
          <Form.Control onChange={handleChange} name="ID_Excursie" type="integer" placeholder="ID-ul este generat automat" disabled readOnly/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridID_Locatie">
          <Form.Label>ID_Locatie</Form.Label>
          <Form.Control onChange={handleChange} name="ID_Locatie" type="integer" placeholder="Enter INT" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridID_Hotel">
          <Form.Label>ID_Hotel</Form.Label>
          <Form.Control onChange={handleChange} name="ID_Hotel" type="integer" placeholder="Enter INT" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridID_Manager">
          <Form.Label>ID_Manager</Form.Label>
          <Form.Control onChange={handleChange} name="ID_Manager" type="integer" placeholder="Enter INT" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridID_Firma_Transport">
          <Form.Label>ID_Firma_Transport</Form.Label>
          <Form.Control onChange={handleChange} name="ID_Firma_Transport" type="integer" placeholder="Enter INT" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridData_Plecare">
            <Form.Label>Data Plecare</Form.Label>
            <Form.Control onChange={handleChange} name="Data_Plecare" type="date" placeholder="Enter date" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDurata">
          <Form.Label>Durata excusie</Form.Label>
          <Form.Control onChange={handleChange} name="Durata" type="integer" placeholder="Enter INT" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridLocuri">
            <Form.Label>Locuri excusie</Form.Label>
            <Form.Control onChange={handleChange} name="Locuri" type="integer" placeholder="Enter INT" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPret">
          <Form.Label>Pret / persoana</Form.Label>
          <Form.Control onChange={handleChange} name="Pret" type="integer" placeholder="RON" />
        </Form.Group>
      </Row>

      <Button onClick={handleClick} variant="primary" type="submit">
        Adauga excursie
      </Button>
    </Form>
    {requestSuccess===1 && 
      <Alert variant="1">Inregistrarea a fost realizata. Vezi toate <NavLink to="/excursions">Excursiile</NavLink>
      
      </Alert>
    }
    </div>
  );
};

export default AddExcursion