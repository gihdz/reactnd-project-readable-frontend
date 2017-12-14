import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Layout extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
