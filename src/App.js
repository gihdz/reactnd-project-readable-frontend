import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CommentList from './containers/CommentList';
import Categories from './containers/DdlCategories';
import Posts from './containers/Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
        <div>
          <Categories />
          <Posts />
        </div>
      </div>
    );
  }
}

export default App;
