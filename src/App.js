import React from 'react';

import Categories from './containers/DdlCategories';
import Posts from './containers/Posts';
import { Link } from 'react-router-dom';
class RootView extends React.Component {
  render() {
    const { category } = this.props.match.params;

    return (
      <div>
        <Link className="btn btn-primary" to="/post/new/">
          Create Post
        </Link>
        <hr />
        <Categories category={category} />

        <Posts category={category} />
      </div>
    );
  }
}

export default RootView;
