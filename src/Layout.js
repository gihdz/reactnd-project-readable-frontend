import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { NotificationContainer } from 'react-notifications';
class Layout extends Component {
  render() {
    return (
      <div className="App container-fluid ">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
        <div className="container">{this.props.children}</div>
        <NotificationContainer />
      </div>
    );
  }
}

export default Layout;
