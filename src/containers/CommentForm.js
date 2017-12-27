import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { withFormik } from 'formik';
import Yup from 'yup';

import * as commentsActions from '../actions/comments.actions';
import { createComment } from '../utils/api';

class CommentForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    //   if (nextProps.categories.length > this.props.categories.length) {
    //     this.props.resetForm(nextProps);
    //   }
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
      handleReset,
      handleSelectChange
    } = this.props;

    const { author, body, postId } = values;

    return (
      <div className="readable-comment-form">
        <h3>New Comment</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <input name="postId" defaultValue={postId} />

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
  // mapPropsToValues: props => ({
  //   body: '',
  //   author: '',
  //   postId: props.postId,
  // }),
  validationSchema: Yup.object().shape({
    body: Yup.string().required('Body is required!'),
    author: Yup.string().required('Author is required!'),
    postId: Yup.string().required('Post Id is required!')
  }),
  handleSubmit: (values, { props }) => {
    const { body, author, postId } = values;
    const { hideCommentFormModal, getComments } = props;

    createComment(postId, author, body).then(d => {
      if (d && d.id) {
        NotificationManager.success('Comment created successfully');
        getComments(postId, hideCommentFormModal);
      }
    });
  },
  displayName: 'BasicForm' // helps with React DevTools
})(CommentForm);
class FormContainer extends React.Component {
  componentDidMount() {}
  render() {
    const { postId, hideCommentFormModal, getComments } = this.props;

    return (
      <EnhancedForm
        author=""
        body=""
        postId={postId}
        hideCommentFormModal={hideCommentFormModal}
        getComments={getComments}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getComments: (postId, cb) =>
      dispatch(commentsActions.getComments(postId, cb))
  };
};
export default connect(null, mapDispatchToProps)(FormContainer);
