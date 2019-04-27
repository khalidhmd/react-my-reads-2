import React from "react";
import Book from "./Book";
class BookShelf extends React.Component {
  componentDidMount() {
    const shelfBooks = this.props.books.filter(
      book => book.shelf === this.props.key
    );
    console.log(this.props);
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <Book />
            </li>
            <li>
              <Book />
            </li>
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
