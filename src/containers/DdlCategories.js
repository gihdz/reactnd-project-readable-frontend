import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import * as categoriesActions from '../actions/categories.actions';

class Categories extends React.Component {
  state = {
    isLoading: true,
    loadingText: 'loading...'
  };
  componentDidMount() {
    this.props.getCategoriesAsync();
  }
  handleChange = selectedOption => {
    this.props.setCurrentCategory(selectedOption.label);
    console.log(`Selected: ${selectedOption.label}`);
  };
  render() {
    let { categories, selectedCategory } = this.props;
    categories = categories.map(c => {
      return { value: c.name, label: c.name };
    });
    return (
      <div>
        <Select
          name="select-categories"
          value={selectedCategory}
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
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategoriesAsync: () => dispatch(categoriesActions.getCategoriesAsync()),
    setCurrentCategory: category =>
      dispatch(categoriesActions.setCurrentCategory(category))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
