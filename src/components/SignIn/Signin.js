import React from 'react'
import { useRef, useState, useEffect } from 'react';
import  "./Signin.css";
import { useNavigate } from 'react-router-dom';
import bank from './bank.jpg'


const Signin = (props) => {

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState('');


  useEffect(() => {
    setErrMsg('');
  }, [])


  const submitForm = () => {
    /*var request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/todos/1" , false);
    request.send();
    var json = JSON.parse(request.responseText);
    console.log(json)
    if (json.id === 1) {*/
      props.changeLogin(true)
      navigate("/home")
    //}
  }

  return (
   <div style={{display: "flex", maxHeight: "100%", maxWidth: "100%"}}>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet" />

    <img src={bank} className='image-bank'/>
    <div style={{width: "30%", padding: "30px"}}><form align='center' style={{display: "flex", flexDirection: "column", justifyContent: "space-around", width: "100", marginTop: "80px", alignItems: "center"}}>
      <div style={{display: "flex", alignItems: "center"}}><img src="https://logos-marques.com/wp-content/uploads/2021/07/Deutsche-Bank-Logo.png" height={40} style={{width: "45px"}}></img> <span style={{fontFamily: "Playfair Display", fontSize: "1.3rem", marginLeft: "10px"}}>Deutsche Bank</span></div>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h2 style={{color: "#695401"}}>Sign In</h2>
      <input
        className='inputs'
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={props.changeEmail}
        value={props.email}
        required
        placeholder='Email'
        />
        <br></br>
        <input
        className='inputs'
          type="password"
          id="password"
          ref={userRef}
          autoComplete="off"
          onChange={props.changePassword}
          value={props.password}
          required
          placeholder='Password'
          />
          <br></br>
          <a onClick={submitForm} className='buttons'>Sign In</a>
          <div className="d-flex justify-content-between mx-4 mb-4" style={{marginTop: "10px"}}>
                < label htmlFor='Remember me' ></label>
                <a href="#">Forgot password?</a>
          </div>
      </form>
      
       </div>
    </div>
  );
};

export default Signin;