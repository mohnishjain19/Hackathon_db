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
    var request = new XMLHttpRequest();
    request.open("GET", "http://16.171.26.117:8000/api/v1/users" , false);
    request.send();
    var json = JSON.parse(request.responseText);
    for(let i = 0; i < json.length; i++){
      console.log(json[i])
      if (props.email == json[i].Email){
        if (props.password == "asdf@1234"){
          props.changeIsManager(false);
          props.changeId(json[i].id)
          props.changeName(json[i].Name)
          props.changeLogin(true);
          navigate("/home");
          return
        }
      }
    }
    var request = new XMLHttpRequest();
    request.open("GET", "http://16.171.26.117:8000/api/v1/managers" , false);
    request.send();
    var json = JSON.parse(request.responseText);
    for(let i = 0; i < json.length; i++){
      console.log(json[i])
      if (props.email == json[i].Email){
        if (props.password == "asdf@1234"){
          props.changeIsManager(true);
          props.changeId(json[i].id)
          props.changeName(json[i].Name)
          props.changeLogin(true);
          navigate("/home");
          return
        }
      }
    }
    alert("Error")
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
          <a onClick={submitForm} className='buttons' style={{width: "110px", cursor: "pointer"}}>Sign In</a>
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