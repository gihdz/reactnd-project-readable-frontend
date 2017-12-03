import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import * as categoriesActions from '../actions/categories.actions';

class Categories extends React.Component {
  state = {
    selectedOption: ''
  };
  // componentDidMount() {
  //   fetchCategories().then(cats => {
  //     const stateCategories = this.state.categories;
  //     let categories = stateCategories.concat(cats);
  //     categories = categories.map(c => {
  //       return { value: c.name, label: c.name };
  //     });
  //     this.setState({ categories });
  //   });
  // }
  componentDidMount() {
    this.props.getCategoriesAsyc();
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  };
  render() {
    let { categories } = this.props;
    const { selectedOption } = this.state;
    const selected = selectedOption || 'all';
    categories = categories.map(c => {
      return { value: c.name, label: c.name };
    });
    return (
      <Select
        name="select-categories"
        value={selected}
        onChange={this.handleChange}
        options={categories}
      />
    );
  }
}

const mapStateToProps = ({ categories }, ownProps) => {
  return { categories };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCategoriesAsyc: dispatch(categoriesActions.getCategoriesAsync)
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
