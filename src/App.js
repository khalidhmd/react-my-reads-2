import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import BookSearch from "./BookSearch";
import ListBooks from "./ListBooks";

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
  componentDidUpdate() {
    this.render();
  }
  updateBookShelf = (book, shelf) => {
    book.shelf = shelf;
    const books = [...this.state.myBooks.filter(b => b.id !== book.id), book];
    BooksAPI.update(book, shelf).then(res => {
      this.setState({ myBooks: [...books] });
      console.log(this.state.myBooks);
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
            <ListBooks
              shelves={this.state.shelves}
              myBooks={this.state.myBooks}
              updateBookShelf={this.updateBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
