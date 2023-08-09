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
  }, [])

  const handleDelete = (user) => {
    console.log(user)
  }

  return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <div className='user-list-container'>

        <table className='user-table'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name (Username)</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
                <tr>
                    <td>{user.id}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Role}</td>
                    <td style={{cursor: "pointer", textAlign: "right", width:"20px"}}><span onClick={handleDelete(user.email)} class="material-symbols-outlined">
                    delete
                    </span></td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>
    </div>
  )
}