import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BookSearch extends React.Component {
  state = {
    books: [],
    query: ""
  };
  searchBooks = query => {
    this.setState({ query });
    BooksAPI.search(query)
      .then(data => {
        console.log(data);
        if (query && data) {
          this.setState({ books: data });
        }
      })
      .catch(err => {
        this.setState({ books: [] });
      });
  };
  render() {
    const myBooks = this.props.myBooks || [];
    let books = this.state.books || [];
    if (!this.state.query) books = [];
    if (books.length > 0 && myBooks.length > 0) {
      books.forEach(book => {
        book.shelf = "none";
        myBooks.forEach(myBook => {
          if (book.id === myBook.id) {
            book.shelf = myBook.shelf;
          }
        });
      });
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={e => {
                this.searchBooks(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
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

export default BookSearch;
