import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from 'react-loading-animation';
import ReactModal from 'react-modal';

import * as commentActions from '../actions/comments.actions';

import CommentForm from './CommentForm';
class CommentList extends Component {
  state = {
    loading: true,
    isModalOpen: false
  };
  componentDidMount() {
    const { postId } = this.props;
    this.props.getComments(postId, () => {
      this.setState({ loading: false });
    });
  }
  showCommentFormModal = () => {
    this.setState({ isModalOpen: true });
  };
  hideCommentFormModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { loading, isModalOpen } = this.state;
    const { postId } = this.props;

    if (loading) return <Loading />;

    const { comments } = this.props;

    const commentsLi = comments.map(c => <Comment key={c.id} comment={c} />);

    return (
      <div className="readable-comment-list">
        <div>
          <button onClick={this.showCommentFormModal} type="button">
            Add Comment{' '}
          </button>
        </div>
        <ul>{commentsLi} </ul>
        <ReactModal
          isOpen={isModalOpen}
          shouldCloseOnEsc={true}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <div>
            <button onClick={this.hideCommentFormModal}>Cancel</button>
            <CommentForm
              postId={postId}
              hideCommentFormModal={this.hideCommentFormModal}
            />
          </div>
        </ReactModal>
      </div>
    );
  }
}
const Comment = ({ comment }) => {
  const { id, body, author, voteScore, timestamp } = comment;
  return (
    <li>
      <div className="readable-comment">
        <h5>
          <strong>{author}</strong> *<small>{voteScore}</small>
        </h5>
        <p className="body">{body}</p>
      </div>
    </li>
  );
};
/* Comment fields
id	String	Unique identifier
parentId	String	id of the parent post
timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
body	String	Comment body
author	String	Comment author
voteScore	Integer	Net votes the comment has received (default: 1)
deleted	Boolean	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
parentDeleted	Boolean	Flag for when the the parent post was deleted, but the comment itself was not.

*/
CommentList.propTypes = {
  comments: propTypes.array.isRequired,
  getComments: propTypes.func.isRequired
};

const mapStateToProps = ({ comments }, ownProps) => {
  return {
    comments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getComments: (postId, cb) =>
      dispatch(commentActions.getComments(postId, cb))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
