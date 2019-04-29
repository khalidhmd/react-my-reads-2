import React from "react";
import Book from "./Book";

const BookShelf = props => {
  const books = props.books || [];
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .filter(book => book.shelf === props.shelfKey)
            .map(book => (
              <li key={book.id}>
                <Book book={book} updateBookShelf={props.updateBookShelf} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
