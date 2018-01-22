import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Posts from './containers/Posts';

import { setCurrentCategory } from './actions/categories.actions';
class RootView extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { category } = nextProps.match.params;
    this.setCategory(category);
  }
  componentDidMount() {
    const { category } = this.props.match.params;

    this.setCategory(category);
  }
  setCategory(category) {
    const { setCurrentCategory } = this.props;

    const cat = category || 'all';

    setCurrentCategory(cat);
  }
  render() {
    const { category } = this.props.match.params;
    const cat = category || 'all';
    const filterText =
      cat === 'all' ? 'Currently seeing all posts' : `Current category: ${cat}`;
    return (
      <div>
        <Link className="btn btn-primary" to="/post/new/">
          Create Post
        </Link>
        <h4 className="filter-text">{filterText}</h4>
        <hr />

        <Posts category={category} />
      </div>
    );
  }
}

export default connect(null, { setCurrentCategory })(RootView);
