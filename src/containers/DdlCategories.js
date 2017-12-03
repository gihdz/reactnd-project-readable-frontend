import React from 'react';
import { fetchCategories } from '../utils/api';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class Categories extends React.Component {
  state = {
    selectedOption: '',
    categories: [{ name: 'all', path: 'all' }]
  };
  componentDidMount() {
    fetchCategories().then(cats => {
      const stateCategories = this.state.categories;
      let categories = stateCategories.concat(cats);
      categories = categories.map(c => {
        return { value: c.name, label: c.name };
      });
      this.setState({ categories });
    });
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  };
  render() {
    const { categories, selectedOption } = this.state;
    const selected = selectedOption || 'all';
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

export default Categories;
