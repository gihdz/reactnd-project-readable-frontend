import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';

import Posts from './containers/Posts';

import { setCurrentCategory } from './actions/categories.actions';
class RootView extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { category } = nextProps.match.params;
    const { history } = this.props;
    const { categories } = nextProps;

    const findInCategories = cat => {
      return cat.name === category;
    };

    if (category && !categories.find(findInCategories)) history.push('/404');
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
    const { categories } = this.props;
    if (categories.length === 0) return <Loading />;
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
const mapStateToProps = ({ categoryState }) => {
  const { categories } = categoryState;
  return {
    categories
  };
};

export default connect(mapStateToProps, { setCurrentCategory })(RootView);
