import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { withRouter } from 'react-router-dom';
import Loading from 'react-loading-animation';

import {
  getCategories,
  setCurrentCategory
} from '../actions/categories.actions';
class Categories extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }
  handleChange = selectedOption => {
    const { history, setCurrentCategory } = this.props;
    history.push(`/${selectedOption.label}`);
    setCurrentCategory(selectedOption.label);

    console.log(`Selected: ${selectedOption.label}`);
  };
  componentWillReceiveProps(nextProps) {
    console.log('category dafuq', nextProps.category);
  }
  render() {
    let { categories, selectedCategory } = this.props;
    if (categories.lenght === 0) return <Loading />;

    categories = categories.map(c => {
      return { value: c.name, label: c.name };
    });
    return (
      <div>
        <Select
          name="select-categories"
          className="root-select-category"
          value={selectedCategory}
          onChange={this.handleChange}
          options={categories}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ categoryState }, ownProps) => {
  const { categories, selectedCategory } = categoryState;
  return {
    categories,
    selectedCategory
  };
};

export default connect(mapStateToProps, { getCategories, setCurrentCategory })(
  withRouter(Categories)
);
