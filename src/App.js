import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Posts from './containers/Posts';
import Categories from './containers/DdlCategories';

import { setCurrentCategory } from './actions/categories.actions';
class RootView extends React.Component {
  render() {
    const { category } = this.props.match.params;
    const cat = category || 'all';
    return (
      <div>
        <Link className="btn btn-primary" to="/post/new/">
          Create Post
        </Link>
        <Categories category={cat} />
        <hr />

        <Posts category={cat} />
      </div>
    );
  }
}

export default connect(null, { setCurrentCategory })(RootView);
