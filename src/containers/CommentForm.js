import React from 'react';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { withFormik } from 'formik';
import Yup from 'yup';
import { fetchCommentById } from '../utils/api';

import * as commentsActions from '../actions/comments.actions';
import { createComment, updateComment } from '../utils/api';

class CommentForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
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
      handleSubmit,
    } = this.props;

    const { id, author, body, postId } = values;

    const isEditing = id ? true : false;

    return (
      <form onSubmit={handleSubmit}>
        <input name="postId" type="hidden" defaultValue={postId} />

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
    body: props.body,
    author: props.author,
    id: props.id,
    postId: props.postId
  }),
  validationSchema: Yup.object().shape({
    body: Yup.string().required('Body is required!'),
    author: Yup.string().required('Author is required!'),
    postId: Yup.string().required('Post Id is required!')
  }),
  handleSubmit: (values, { props }) => {
    const { id, body, author, postId } = values;
    const { hideCommentFormModal, getComments } = props;

    if (!id) {
      createComment(postId, author, body).then(d => {
        if (d && d.id) {
          NotificationManager.success('Comment created successfully');
          getComments(postId, hideCommentFormModal);
        }
      });
    } else {
      updateComment(id, body).then(d => {
        if (d && d.id) {
          NotificationManager.success('Comment updated successfully');
          getComments(postId, hideCommentFormModal);
        }
      });
    }
  },
  displayName: 'BasicForm' // helps with React DevTools
})(CommentForm);
class FormContainer extends React.Component {
  state = {
    formTitle: '',
    id: '',
    author: '',
    body: ''
  };
  componentDidMount() {
    const { commentId } = this.props;
    if (commentId)
      fetchCommentById(commentId).then(r => {
        if (r && r.id) {
          this.setState({ ...r, formTitle: 'Edit Comment' });
        }
      });
    else this.setState({ formTitle: 'New Comment' });
  }
  render() {
    const { postId, hideCommentFormModal, getComments } = this.props;

    const { formTitle, id, author, body } = this.state;

    return (
      <div className="readable-comment-form">
        <h3>{formTitle}</h3>
        <hr />
        <EnhancedForm
          author={author}
          body={body}
          id={id}
          postId={postId}
          hideCommentFormModal={hideCommentFormModal}
          getComments={getComments}
        />
      </div>
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
