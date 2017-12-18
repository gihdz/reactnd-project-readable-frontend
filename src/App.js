import React from 'react';

import Categories from './containers/DdlCategories';
import Posts from './containers/Posts';
import { Link } from 'react-router-dom';
class RootView extends React.Component {
  render() {
    return (
      <div>
        <Link className="btn btn-primary" to="/post">
          Create Post
        </Link>
        <hr />
        <Categories />

        <Posts />
      </div>
    );
  }
}

export default RootView;
