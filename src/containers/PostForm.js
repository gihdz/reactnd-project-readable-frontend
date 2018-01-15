import React from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions/categories.actions';
import { createPost, fetchPostById, updatePost } from '../utils/api';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { withFormik } from 'formik';
import Yup from 'yup';
import Loading from 'react-loading-animation';
import queryString from 'query-string';
class MyPostForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.categories.length > this.props.categories.length ||
      this.props.id !== nextProps.id
    ) {
      this.props.resetForm(nextProps);
    }
  }
  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleSubmit
    } = this.props;

    const { id, title, author, body, category, categories } = values;
    const cats = categories.map(c => (
      <option key={`opt-${c.name}`} value={c.name}>
        {c.name}
      </option>
    ));

    const isEditing = id ? true : false;
    return (
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
            disabled={isEditing}
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
            touched.body && <div className="input-feedback">{errors.body}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            value={category}
            onChange={handleChange}
            name="category"
            disabled={isEditing}
          >
            {cats}
          </select>
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
    );
  }
}
const EnhancedForm = withFormik({
  mapPropsToValues: props => ({
    id: props.id,
    title: props.title,
    body: props.body,
    author: props.author,
    category: props.category,
    categories: props.categories
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Title is required!'),
    body: Yup.string().required('Body is required!'),
    author: Yup.string().required('Author is required!'),
    category: Yup.string().required('Category is required!')
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { id, title, body, author, category } = values;
    const { history, returnPath } = props;
    const path = returnPath || '/';
    if (!id)
      createPost(title, body, author, category).then(p => {
        if (p && p.id) {
          NotificationManager.success('Post created successfully');
          history.push(path);
        }
      });
    else
      updatePost(id, title, body).then(p => {
        if (p && p.id) {
          NotificationManager.success('Post edited successfully');
          history.push(path);
        }
      });
  },
  displayName: 'BasicForm' // helps with React DevTools
})(MyPostForm);

class FormContainer extends React.Component {
  state = {
    formTitle: '',
    id: '',
    title: '',
    author: '',
    body: '',
    category: '',
    loading: true
  };
  componentDidMount() {
    const { postId } = this.props.match.params;
    if (postId)
      fetchPostById(postId).then(r => {
        if (r && r.id) {
          this.setState(
            { ...r, formTitle: 'Edit Post', loading: false },
            this.props.getCategories
          );
        }
      });
    else
      this.setState(
        { formTitle: 'New Post', loading: false },
        this.props.getCategories
      );
  }
  render() {
    const { loading } = this.state;

    if (loading) return <Loading />;
    const { categories, location, history } = this.props;
    const { id, title, author, body, category, formTitle } = this.state;

    const { returnPath } = queryString.parse(location.search);

    const filteredCategories = categories.filter(c => c.name !== 'all');

    let cat = category;
    if (!cat)
      cat = filteredCategories.length > 0 ? filteredCategories[0].name : '';

    return (
      <div className="readable-post-form">
        <h3>{formTitle}</h3>
        <hr />
        <EnhancedForm
          id={id}
          title={title}
          author={author}
          body={body}
          category={cat}
          categories={filteredCategories}
          history={history}
          returnPath={returnPath}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ categoryState }) => {
  return {
    categories: categoryState.categories
  };
};

export default connect(mapStateToProps, { getCategories })(FormContainer);
