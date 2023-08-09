import React, { useEffect } from 'react'
import './Dashboard.css'
import {useState} from 'react'
  
export default function Userlist () {
  const [users, setUsers]=useState([])

  useEffect(() => {
    var request = new XMLHttpRequest();
        request.open("GET", "http://16.171.26.117:8000/api/v1/users" , false);
        request.send();
        var users = JSON.parse(request.responseText);
        var request = new XMLHttpRequest();
        request.open("GET", "http://16.171.26.117:8000/api/v1/managers" , false);
        request.send();
        var managers = JSON.parse(request.responseText);
        for(let i=0; i<users.length; i++) {
            var request = new XMLHttpRequest();
            request.open("GET", "http://16.171.26.117:8000/api/v1/userbonds?id=" + users[i].id, false);
            request.send();
            var books = JSON.parse(request.responseText);
            users[i].books = books;
        }
        for(let i=0; i<managers.length; i++) {
            var request = new XMLHttpRequest();
            request.open("GET", "http://16.171.26.117:8000/api/v1/userbonds?id=" + managers[i].id, false);
            request.send();
            var books = JSON.parse(request.responseText);
            managers[i].books = books;
        }
        let res = [...users, ...managers];
        setUsers(res);
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