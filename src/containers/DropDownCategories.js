import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Loading from 'react-loading-animation';

import {
  getCategories,
  setCurrentCategory
} from '../actions/categories.actions';

class Categories extends React.Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    let { categories, selectedCategory } = this.props;
    const cat = selectedCategory;

    categories = categories.map(c => (
      <Link key={c.name} className="dropdown-item" to={`/${c.name}`}>
        {c.name}
      </Link>
    ));
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
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
  return {
    categories: categoryState.categories,
    selectedCategory: categoryState.selectedCategory
  };
};

export default connect(mapStateToProps, { getCategories, setCurrentCategory })(
  withRouter(Categories)
);
