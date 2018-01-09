import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from 'react-loading-animation';
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';

import * as commentActions from '../actions/comments.actions';
import { VOTE_TYPE } from '../utils/constants';

import CommentForm from './CommentForm';
import Vote from './Vote';

import { eraseComment } from '../utils/api';
import ConfirmAlert from '../utils/ConfirmAlert';

class CommentList extends Component {
  state = {
    loading: true,
    isModalOpen: false,
    currentComment: ''
  };
  componentDidMount() {
    this.getComments();
  }
  getComments = () => {
    this.setState({ loading: true }, () => {
      const { postId } = this.props;
      this.props.getComments(postId, () => {
        this.setState({ loading: false });
      });
    });
  };
  setCurrentComment = currentComment => {
    this.setState({ currentComment, isModalOpen: true });
  };
  showCommentFormModal = () => {
    this.setState({ isModalOpen: true });
  };
  hideCommentFormModal = (cb = null) => {
    this.setState({ isModalOpen: false, currentComment: '' }, () => {
      if (cb && typeof cb === 'function') cb();
    });
  };
  hideModalAndGetComments = () => {
    this.hideCommentFormModal(this.getComments);
  };
  deleteComment = commentId => {
    this.setState({ loading: true }, () => {
      eraseComment(commentId).then(r => {
        if (r && r.id) this.getComments();
      });
    });
  };
  render() {
    const { loading, isModalOpen, currentComment } = this.state;
    const { postId } = this.props;

    if (loading) return <Loading />;

    const { comments } = this.props;

    const commentsLi = comments.map(c => (
      <Comment
        key={c.id}
        comment={c}
        setCurrentComment={() => this.setCurrentComment(c.id)}
        deleteComment={() => this.deleteComment(c.id)}
      />
    ));

    return (
      <div className="readable-comment-list">
        <div>
          <button
            className="btn btn-primary"
            onClick={this.showCommentFormModal}
            type="button"
          >
            Add Comment{' '}
          </button>
        </div>
        <hr />
        <ul className="list-group">{commentsLi} </ul>
        <ReactModal
          isOpen={isModalOpen}
          shouldCloseOnEsc={true}
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
        >
          <div>
            <button
              onClick={this.hideCommentFormModal}
              type="button"
              className="close"
              aria-label="Close"
              style={{ cursor: 'pointer' }}
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <CommentForm
              postId={postId}
              hideCommentFormModal={this.hideModalAndGetComments}
              commentId={currentComment}
            />
          </div>
        </ReactModal>
        <ReactTooltip />
      </div>
    );
  }
}
class Comment extends React.Component {
  deleteWarning = e => {
    e.preventDefault();

    ConfirmAlert(
      'Confirm Delete',
      'Sure you want to delete this comment?',
      () => {
        const { deleteComment } = this.props;
        deleteComment();
      }
    );
  };
  render() {
    const { comment, setCurrentComment } = this.props;
    const { id, body, author, voteScore } = comment;
    return (
      <li className="list-group-item">
        <div className="readable-comment">
          <Vote vote={voteScore} id={id} voteType={VOTE_TYPE.COMMENT} />

          <h5>
            <strong>{author}</strong>{' '}
            <button
              className="btn-edit-comment btn btn-link"
              onClick={setCurrentComment}
              type="button"
              data-tip="Edit Comment"
            >
              <i className="material-icons">mode_edit</i>
            </button>
            <button
              className="btn-delete-comment btn btn-link"
              onClick={this.deleteWarning}
              type="button"
              data-tip="Delete Comment"
            >
              <i className="material-icons">remove_circle</i>
            </button>
          </h5>
          <pre className="body">{body}</pre>
        </div>
      </li>
    );
  }
}
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
