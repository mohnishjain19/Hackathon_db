import React from 'react'
import './Dashboard.css'
const users=[
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "Admin"
    },
    {
      "id": 2,
      "username": "jane_smith",
      "email": "jane@example.com",
      "password": "pass456",
      "role": "User"
    },
    {
      "id": 3,
      "username": "bob_johnson",
      "email": "bob@example.com",
      "password": "secret789",
      "role": "User"
    }
    // Add more user objects as needed
  ];    
export default function Userlist () {
  return (
      
    <div className='user-list-container'>
        <table className='user-table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name (Username)</th>
                <th>Email</th>
                <th>Role</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
                <tr>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}
