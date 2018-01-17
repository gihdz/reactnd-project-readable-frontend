import React from 'react';
import { Link } from 'react-router-dom';
import Categories from './DdlCategories';
import DropDownCategories from './DropDownCategories';

export default () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link to="/" className="navbar-brand" href="#">
      Readable
    </Link>
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
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            Posts
          </Link>
        </li>

        <DropDownCategories />
        {/* <li className="nav-item">
          <a className="nav-link disabled" href="#">
            Disabled
          </a>
        </li> */}
      </ul>
      {/* <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />

        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form> */}
    </div>
  </nav>
);
