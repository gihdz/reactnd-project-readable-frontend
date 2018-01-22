import React from 'react';
import DropDownCategories from './DropDownCategories';

export default () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <span className="navbar-brand">Readable</span>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <DropDownCategories />
      </ul>
    </div>
  </nav>
);
