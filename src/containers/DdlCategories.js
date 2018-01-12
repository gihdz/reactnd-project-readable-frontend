import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { withRouter } from 'react-router-dom';

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
  handleChange = selectedOption => {
    const { history } = this.props;
    history.push(selectedOption.label);
    this.props.setCurrentCategory(selectedOption.label);

    console.log(`Selected: ${selectedOption.label}`);
  };
  render() {
    let { categories, selectedCategory, category } = this.props;

    const cat = category || selectedCategory;

    categories = categories.map(c => {
      return { value: c.name, label: c.name };
    });
    return (
      <div>
        <Select
          name="select-categories"
          className="root-select-category"
          value={cat}
          onChange={this.handleChange}
          options={categories}
        />
      </div>
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
