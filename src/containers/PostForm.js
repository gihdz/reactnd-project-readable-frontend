import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as categoriesActions from '../actions/categories.actions';
import { createPost } from '../utils/api';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { withFormik } from 'formik';
import Yup from 'yup';

class MyPostForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.length > this.props.categories.length) {
      // console.log('Reseting form');
      this.props.resetForm(nextProps);
    }
  }
  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset
    } = this.props;

    const { title, author, body, category, categories } = values;
    const cats = categories.filter(c => c.name !== 'all').map(c => {
      return { value: c.name, label: c.name };
    });
    return (
      <div className="readable-post-form">
        <h3>New Post</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className={
                errors.title && touched.title
                  ? 'form-control error'
                  : 'form-control'
              }
              id="title"
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={handleChange}
              ref={input => (this.inputTitle = input)}
            />
            {errors.title &&
              touched.title && (
                <div className="input-feedback">{errors.title}</div>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className={
                errors.author && touched.author
                  ? 'form-control error'
                  : 'form-control'
              }
              id="author"
              name="author"
              placeholder="Enter author"
              value={author}
              onChange={handleChange}
            />
            {errors.author &&
              touched.author && (
                <div className="input-feedback">{errors.author}</div>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              type="text"
              className={
                errors.body && touched.body
                  ? 'form-control readable-post-body error'
                  : 'form-control readable-post-body'
              }
              id="body"
              name="body"
              value={body}
              onChange={handleChange}
            />
            {errors.body &&
              touched.body && (
                <div className="input-feedback">{errors.body}</div>
              )}
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <Select
              name="category"
              value={category}
              onChange={this.handleSelectChange}
              options={cats}
              className={errors.category && touched.category ? 'error' : ''}
            />
            {errors.category &&
              touched.category && (
                <div className="input-feedback">{errors.category}</div>
              )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const EnhancedForm = withFormik({
  mapPropsToValues: props => ({
    title: '',
    body: '',
    author: '',
    category: '',
    categories: props.categories
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required!'),
    body: Yup.string().required('Body is required!'),
    author: Yup.string().required('Author is required!'),
    category: Yup.string() //.required('Category is required!')
  }),
  handleSubmit: (values, { setSubmitting, categories }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: 'BasicForm' // helps with React DevTools
})(MyPostForm);

class FormContainer extends React.Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    return (
      <EnhancedForm
        title=""
        author=""
        body=""
        categories={this.props.categories}
      />
    );
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
