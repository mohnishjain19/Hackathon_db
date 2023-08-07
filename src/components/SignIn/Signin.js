import React, { useState } from 'react'

export default function Signin(props) {

  return (
    <div>
        <input onChange={props.changeEmail} value={props.email}/>
        <p>{props.email}</p>
        <button onClick={props.submitForm}>Submit</button>
    </div>
  )
}
