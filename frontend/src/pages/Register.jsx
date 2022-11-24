import React from 'react'
import {useEffect, useRef, useState, useContext} from 'react';
import {Form,Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import AuthContext from "../context/AuthProvider";
import  axios from "../api/axios"



function Register() {
  const REGISTER_URL = '/register';
  const accountType = 1;
  const {setAuth} = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user,setUser] = useState('');
  const [pwd,setPwd] = useState('');
  const [errMsg,setErrMsg] = useState('');
  const [success,setSuccess] = useState('');
  const [buttonDisable,setButtonDisable] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(REGISTER_URL, 
            JSON.stringify({user,pwd,accountType}), 
            {
                headers: {'Content-Type': 'application/json'}
            });
        console.log(JSON.stringify(response));
        //console.log(JSON.stringify(response?.data));
        setAuth({user,pwd,accountType})
        setUser('');
        setPwd('');
        setSuccess(true);
    }catch(err){
        if(!err?.response){
            setErrMsg('No server response');
        }else if(err?.response?.status === 400){
            setErrMsg('Missing user or password');
        }else if(err?.response?.status === 400){
            setErrMsg('Unauthorized');
        }else{
            setErrMsg('LogIn failed!');
        }
        errRef.current.focus()
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
            <h1>Acount has been created.You are now logged in!</h1>
            <br/>
            <Link to='/excursions'>Go to Home</Link>
        </div>

    ):(
        <Form>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign Up</h1>
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

            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter password" 
                    onChange = {(e) => {
                      if(e.target.value === pwd){
                        setButtonDisable(false);
                      }else{
                        setButtonDisable(true);
                      }
                    }}
                    required
                />
            </Form.Group>
            
            <Button onClick={handleRegister} variant="primary" type="submit" disabled={buttonDisable}>
                Sign In
            </Button >
            <p>
                Already have an account?<br/>
                <span className = "line">
                <Link to = '/Login'>Sign In</Link>
                </span>
            </p>
    </Form>
    )}
</div>
)
}

export default Register