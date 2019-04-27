import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Link } from "react-router-dom";
import BookSearch from "./BookSearch";
import BookShelf from "./BookShelf";

class BooksApp extends React.Component {
  state = {
    shelves: {
      currentlyReading: "Currently Reading",
      wantToRead: "Want to Read",
      read: "Read"
    },
    myBooks: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({ myBooks: res });
    });
  }

  updateBookShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(res => {
      this.setState(state => ({
        myBooks: [...state.myBooks.filter(b => b.id !== book.id), book]
      }));
    });
  };
  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <BookSearch
              myBooks={this.state.myBooks}
              updateBookShelf={this.updateBookShelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {Object.keys(this.state.shelves).map(key => (
                    <BookShelf
                      key={key}
                      shelfKey={key}
                      shelfName={this.state.shelves[key]}
                      books={this.state.myBooks}
                      updateBookShelf={this.updateBookShelf}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
