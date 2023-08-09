import React from 'react'
import { useEffect, useState } from 'react';

export default function AssignBonds(props) {
    const [Users, setUsers] = useState([]);
    const [bookName, setBookName] = useState();
    const [userId, setUserId] = useState();
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

    const handleClick = () => {
        var request = new XMLHttpRequest();
          request.open("GET", "http://16.171.26.117:8000/api/v1/books", false);
          request.send();
          var bookData = JSON.parse(request.responseText);
          var bookId = null;
          for(let i=0; i<bookData.length; i++) {
            if(bookData[i].BookName == bookName){
                bookId = bookData[i].id
            }
          }
          if (!bookId){
            alert("No such book present")
            return
          }
        fetch("http://16.171.26.117:8000/api/v1/addbookuser", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        "bookId": bookId,
        "userId": userId
      })
    })
    .then( (response) => { 
      alert("Successfully Added")
    }).catch ((error) => {
      alert("Some error occured")
    });
    }

  return (
    <div style={{minWidth: "80%", textAlign: "center"}}>
        {
            Users.map((user) => <div style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: "30px", marginTop: "30px"}}>
                <h5>Id: {user.id}</h5>
                <h5>Name: {user.Name}</h5>
                <h6>Books: </h6>
                {user.books.map((book) => <div>
                    <h6>{book}</h6>
                </div>)}
            </div>)
        }
        <br />
        <br />
        <br />
        <h3>Assign Books</h3><br /><br />
        <input value={userId} placeholder='User ID' onChange={(event)=>setUserId(event.target.value)}></input><br />
        <input value={bookName} placeholder='book Name' onChange={(event)=>setBookName(event.target.value)}></input><br />
        <button onClick={handleClick}>Assign</button>
        <br />
        <br />
    </div>
  )
}
