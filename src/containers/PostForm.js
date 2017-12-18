import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as categoriesActions from '../actions/categories.actions';
import { createPost } from '../utils/api';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class PostForm extends React.Component {
  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getCategories();
    this.inputTitle.focus();
  }
  handleChange(e) {
    const target = e.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  handleSelectChange = selected => {
    this.setState({ category: selected });
  };
  handleSubmit(e) {
    e.preventDefault();
    const { title, body, author, category } = this.state;
    createPost(title, body, author, category.value).then(p => {
      if (p && p.id) {
        const { history } = this.props;
        NotificationManager.success('Post created successfully');
        history.push('/');
      }
    });
  }
  render() {
    const { title, body, author, category } = this.state;

    const categories = this.props.categories
      .filter(c => c.name !== 'all')
      .map(c => {
        return { value: c.name, label: c.name };
      });
    return (
      <div className="readable-post-form">
        <h3>New Post</h3>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={this.handleChange}
              ref={input => (this.inputTitle = input)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              name="author"
              placeholder="Enter author"
              value={author}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              type="text"
              className="form-control readable-post-body"
              id="body"
              name="body"
              value={body}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <Select
              name="category"
              value={category}
              onChange={this.handleSelectChange}
              options={categories}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ categoryState }) => {
  return {
    categories: categoryState.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(categoriesActions.getCategories())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
