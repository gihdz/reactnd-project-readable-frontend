import React from 'react';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import { withRouter } from 'react-router-dom';

import Loading from 'react-loading-animation';

import {
  getCategories,
  setCurrentCategory
} from '../actions/categories.actions';
import { getPosts, setLoadingPosts } from '../actions/posts.actions';

class Categories extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.getCategories();
  }
  getPostsByCategory = category => {
    const {
      history,
      getPosts,
      categories,
      setCurrentCategory,
      setLoadingPosts
    } = this.props;

    setCurrentCategory(category);

    const { pathname } = history.location;

    let isInRootView = pathname === '/';
    for (let i = 0; i < categories.length; i++) {
      if (pathname === `/${categories[i].name}`) {
        isInRootView = true;
        break;
      }
    }
    history.push(`/${category}`);

    if (isInRootView) {
      setLoadingPosts(true);
      getPosts(category, () => {
        setLoadingPosts(false);
      });
    }
  };
  render() {
    let { categories } = this.props;

    categories = categories.map(c => (
      <a
        key={c.name}
        className="dropdown-item"
        onClick={e => {
          e.preventDefault();
          this.getPostsByCategory(c.name);
        }}
        href="#category"
      >
        {c.name}
      </a>
    ));
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#ddl-category"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Categories
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {categories.length === 0 ? <Loading /> : <div>{categories}</div>}
        </div>
      </li>
    );
  }
}

const mapStateToProps = ({ categoryState }, ownProps) => {
  const { selectedCategory, categories } = categoryState;
  return {
    categories,
    selectedCategory
  };
};

export default connect(mapStateToProps, {
  getCategories,
  setCurrentCategory,
  getPosts,
  setLoadingPosts
})(withRouter(Categories));
