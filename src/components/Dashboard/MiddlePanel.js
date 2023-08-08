import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import your CSS file for styling
import Book from './Book';

// ... Repeat similar structure for Component3, Component4, Component5

const MiddlePanel = () => {
  const [books, setBooks] = useState([{id: 1, BookName: "John Doe's Book"}, {id: 2, BookName: "Ho Li's Book"}])

  useEffect(() => {
    /*const fetchData = async () => {
        const response = await fetch(`http://16.171.26.117:8000/api/v1/books`);
        const newData = await response.json();
        setBooks(newData);
    };
    
    fetchData();*/
  }, []) 

  return (
    <div className="panel" style={{maxWidth: "80%", textAlign: "center"}}>
      <h2 className="pf" style={{paddingTop: "20px", paddingBottom: "30px"}}>Your Books</h2>
      <ul className="book-list">
        {
            books.map((book) => {
                return (
                    <Book book={book}/>
                )
            })
        }
      </ul>
    </div>
  );
};

export default MiddlePanel;