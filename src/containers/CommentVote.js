import React from 'react';
import { voteForComment } from '../utils/api';
import * as commentsActions from '../actions/comments.actions';
import { connect } from 'react-redux';

class CommentVote extends React.Component {
  upVote = () => {
    this.voteComment('upVote');
  };
  downVote = () => {
    this.voteComment('downVote');
  };
  voteComment(vote) {
    const { commentId, getComments } = this.props;
    voteForComment(commentId, vote).then(r => {
      if (r && r.id) getComments(r.parentId);
    });
  }
  render() {
    const { vote, commentId } = this.props;

    const voteClass = vote < 0 ? 'btn-danger' : 'btn-light';
    const voteScore = Math.abs(vote);
    return (
      <div className="comment-vote-buttons">
        <div className="btn-group" role="group" aria-label="Vote button group">
          <button
            onClick={this.upVote}
            type="button"
            className="btn btn-secondary"
          >
            <i className="material-icons">arrow_drop_up</i>
          </button>
          <button type="button" className={`btn ${voteClass}`}>
            {voteScore}
          </button>
          <button
            onClick={this.downVote}
            type="button"
            className="btn btn-secondary"
          >
            <i className="material-icons">arrow_drop_down</i>
          </button>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getComments: postId => dispatch(commentsActions.getComments(postId))
  };
};

export default connect(null, mapDispatchToProps)(CommentVote);
