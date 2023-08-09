import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css'; 

export default function AddUserPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    fetch("http://16.171.26.117:8000/api/v1/create", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        name: name,
        email: email,
        role: role
      })
    })
    .then( (response) => { 
      alert(response.message)
    }).catch ((error) => {
      alert(error.error)
    });
  };

  return (
    <div className="add-user-page">
      <div className="add-user-form">
        <h1>Add User</h1>

        <form onSubmit={handleSubmit}>

          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Role:
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>

          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
}