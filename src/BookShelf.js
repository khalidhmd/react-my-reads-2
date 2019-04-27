import React from "react";
import Book from "./Book";
class BookShelf extends React.Component {
  render() {
    const books = this.props.books || [];
    console.log(books);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter(book => book.shelf === this.props.shelfKey)
              .map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    updateBookShelf={this.props.updateBookShelf}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
