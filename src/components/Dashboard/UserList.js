import React, { useEffect } from 'react'
import './Dashboard.css'
import {useState} from 'react'
  
export default function Userlist () {
  const [users, setUsers]=useState([])

  useEffect(() => {
    var request = new XMLHttpRequest();
    request.open("GET", "http://16.171.26.117:8000/api/v1/users" , false);
    request.send();
    var json = JSON.parse(request.responseText);
    setUsers(json)
  })

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
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Role}</td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
  )
}