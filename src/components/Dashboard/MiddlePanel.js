import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import your CSS file for styling
import Book from './Book';
import { FilterDropDownList } from './FilterDropDownList';

// ... Repeat similar structure for Component3, Component4, Component5

const MiddlePanel = (props) => {
  const [books, setBooks] = useState([])
  const [category, setCategory] = useState("")

  useEffect(() => {
    const fetchData = async () => {
        if(props.isManager){
          var request = new XMLHttpRequest();
          request.open("GET", "http://16.171.26.117:8000/api/v1/books", false);
          request.send();
          var bookData = JSON.parse(request.responseText);
          setBooks(bookData)
          return
        }
        var request = new XMLHttpRequest();
        request.open("GET", "http://16.171.26.117:8000/api/v1/userbonds?id=" + props.id , false);
        request.send();
        var newData = JSON.parse(request.responseText);
        console.log(newData);
        var request = new XMLHttpRequest();
        request.open("GET", "http://16.171.26.117:8000/api/v1/books", false);
        request.send();
        var bookData = JSON.parse(request.responseText);
        console.log(bookData);
        let result = [];
        for(let i=0; i<newData.length; i++) {
          for(let j=0; j<bookData.length; j++){
            if (newData[i] === bookData[j].BookName){
              result.push(bookData[i])
            }
          }
        }
        setBooks(result);
    };
    
    fetchData();
  }, []) 

  return (
    <div className="panel" style={{minWidth:"80%", maxWidth: "80%", textAlign: "center"}}>
      <h2 className="pf" style={{paddingTop: "20px", paddingBottom: "30px"}}>Your Books</h2>
      <FilterDropDownList setCategory={setCategory}/>
      <ul className="book-list">
        {
            books.map((book) => {
                return (
                    <Book book={book} category={category}/>
                )
            })
        }
      </ul>
    </div>
  );
};

export default MiddlePanel;