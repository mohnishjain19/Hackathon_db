import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import  "./Signin.css";



const Signin = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  },[])

  useEffect(() => {
    setErrMsg('');
  }, [user,pwd])


  return (
   <section>
    <img src='https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
    <form align='center'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={(e) => setUser(e.target.value)}
        value={user}
        required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          />
          <button>Sign In</button>
      </form>
      <div className="d-flex justify-content-between mx-4 mb-4">
                < label htmlFor='Remember me' ></label>
                <a href="!#">Forgot password?</a>
       </div>

   </section>
  );
};




export default Signin;
