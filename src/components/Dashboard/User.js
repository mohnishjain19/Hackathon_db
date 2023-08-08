import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css'; 

export default function AddUserPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted user data:', { email, role });
  };

  return (
    <div className="add-user-page">
      <Sidebar/>
      <div className="add-user-form">
        <h1>Add User</h1>

        <form onSubmit={handleSubmit}>

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

          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
}