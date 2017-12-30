import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';

import logo from './logo.svg';
import './App.css';
import Nav from './containers/Nav';
class Layout extends Component {
  render() {
    return (
      <div className="App container-fluid ">
        <div className="container">
          <Nav />
          {this.props.children}
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default Layout;
