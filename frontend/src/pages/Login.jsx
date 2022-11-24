import React from 'react'
import {useEffect, useRef, useState, useContext} from 'react';
import {Form,Button, Alert} from "react-bootstrap"
import {Link,useNavigate} from "react-router-dom"
import AuthContext from "../context/AuthProvider";
import  axios from "../api/axios"



const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState('');
    const [alertShow,  setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

   const handleLogin = async (e) => {
    e.preventDefault();
    try{
        const userData = {
                user:user,
                pwd:pwd
            }
        const response = await axios.get('http://localhost:5000/login',{ params: userData });
        //console.log(response.data.length);
        const usersFound = response.data.length;
        if(!usersFound){
            setAlertMessage("You don't have an account. Register now using the link below!");
            setAlertShow(true);
        }else{
            setAlertMessage("");
            setAlertShow(false);
            response.data.map((userdata) => {
                //console.log(userdata.Account_Type);
                if(userdata.PWD === pwd){
                    console.log('user gasit parola corecta')
                    const accType = userdata.Account_Type;
                    setAuth({user,pwd,accType})
                    navigate('/excursions');
                }else if(!AuthContext){
                    console.log('user gasit parola incorecta')
                    setAlertMessage("Wrong password");
                    setAlertShow(true);
                }
            })
        }
    }catch(err){
        console.log(err);
    }
   }

    useEffect(() => {

    },[])

    useEffect(() => {
        setErrMsg('');
    },[user,pwd])
  return (
    <div>
        {success ? (
            <div className="success">
                <h1>You are logged in!</h1>
                <br/>
                <Link to='/excursions'>Go to Home</Link>
            </div>

        ):(
            <Form>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        ref = {userRef}
                        type="email" 
                        placeholder="Enter email" 
                        autoComplete="true" 
                        onChange = {(e) => setUser(e.target.value)}
                        value = {user}
                        required
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        onChange = {(e) => setPwd(e.target.value)}
                        value = {pwd}
                        required
                    />
                </Form.Group>
                {alertShow && 
                <Alert variant='primary'>
                    {alertMessage}
                </Alert>}
                <Button onClick={handleLogin} variant="primary" type="submit">
                    Sign In
                </Button>
                <p>
                    You don't have an account? <br/>
                    <span className = "line">
                    <Link to = '/Register'>Sign up</Link>
                    </span>
                </p>
        </Form>
        )}
    </div>
  )
}

export default Login