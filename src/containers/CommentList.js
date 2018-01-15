import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Loading from 'react-loading-animation';
import ReactModal from 'react-modal';
import ReactTooltip from 'react-tooltip';

import { getComments } from '../actions/comments.actions';

import CommentForm from './CommentForm';
import { eraseComment } from '../utils/api';
import Comment from './Comment';

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

CommentList.propTypes = {
  comments: propTypes.array.isRequired,
  getComments: propTypes.func.isRequired
};

const mapStateToProps = ({ comments }, ownProps) => {
  return {
    comments
  };
};

export default connect(mapStateToProps, { getComments })(CommentList);
