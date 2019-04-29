import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

const ListBooks = props => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(props.shelves).map(key => (
            <BookShelf
              key={key}
              shelfKey={key}
              shelfName={props.shelves[key]}
              books={props.myBooks}
              updateBookShelf={props.updateBookShelf}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};
export default ListBooks;
