import React from 'react'
import {useState, useEffect, useContext} from 'react'
import {Form,Button,Col,Row,Alert} from "react-bootstrap"
import {NavLink,Link, useLocation} from "react-router-dom"
import axios from "axios"
import AuthContext from "../context/AuthProvider";

const Update = () => {
  const {auth} = useContext(AuthContext);
  const accType = (auth.accType);
  const [requestSuccess, setRequestSuccess] = useState([]);
  const [dataQueryFinished, setDataQueryFinished] = useState([]);
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
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  console.log(id)

  
  useEffect(() => {
    const fetchAllExcursions = async () => {
      try{
        const res = await axios.get("http://localhost:5000/excursions/"+id)
        console.log(res.data)
        setExcursion(res.data)
        setDataQueryFinished(1);
      }catch(err){
        console.log(err);
      }
    }
    fetchAllExcursions()
  },[]);

  const handleChange = (e) => {
    setExcursion(prev=>({...prev,[e.target.name]:e.target.value}));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try{
      await axios.put("http://localhost:5000/excursions/update/"+ id, excursion)
      setRequestSuccess(1);
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div>
      {!accType?(
        <div className="display-page-wrapper">
          {dataQueryFinished===1 && <Form>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridID_Excursie">
              <Form.Label>ID_Excursie</Form.Label>
              <Form.Control onChange={handleChange} name="ID_Excursie" type="integer" placeholder="ID-ul este generat automat" disabled readOnly/>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridID_Locatie">
              <Form.Label>ID_Locatie</Form.Label>
              <Form.Control onChange={handleChange} name="ID_Locatie" type="integer" placeholder={excursion[0].ID_Hotel} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridID_Hotel">
              <Form.Label>ID_Hotel</Form.Label>
              <Form.Control onChange={handleChange} name="ID_Hotel" type="integer" placeholder={excursion[0].ID_Hotel} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridID_Manager">
              <Form.Label>ID_Manager</Form.Label>
              <Form.Control onChange={handleChange} name="ID_Manager" type="integer" placeholder={excursion[0].ID_Manager} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridID_Firma_Transport">
              <Form.Label>ID_Firma_Transport</Form.Label>
              <Form.Control onChange={handleChange} name="ID_Firma_Transport" type="integer" placeholder={excursion[0].ID_Firma_Transport} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridData_Plecare">
                <Form.Label>Data Plecare</Form.Label>
                <Form.Control onChange={handleChange} name="Data_Plecare" type="date" placeholder={excursion[0].Data_Plecare} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridDurata">
              <Form.Label>Durata excusie</Form.Label>
              <Form.Control onChange={handleChange} name="Durata" type="integer" placeholder={excursion[0].Durata} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridLocuri">
                <Form.Label>Locuri excusie</Form.Label>
                <Form.Control onChange={handleChange} name="Locuri" type="integer" placeholder={excursion[0].Locuri} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPret">
              <Form.Label>Pret / persoana</Form.Label>
              <Form.Control onChange={handleChange} name="Pret" type="integer" placeholder={`${excursion[0].Pret} RON`} />
            </Form.Group>
          </Row>

          <Button onClick={handleClick} variant="primary" type="submit">
            Update
          </Button>
          </Form>}
          {requestSuccess===1 && 
            <Alert variant="1">Inregistrarea a fost modificata. Vezi toate <NavLink to="/excursions">Excursiile</NavLink>
            
            </Alert>
          }
        </div>
      ):(
        <div className="success">
              <h1>This page is only for admins</h1>
              <br/>
              <Link to='/excursions'>Go to Home</Link>
        </div>
      )}
    </div>
  );
};

export default Update;