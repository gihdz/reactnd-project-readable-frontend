import React from 'react';
import { voteForComment, voteForPost } from '../utils/api';
import * as commentsActions from '../actions/comments.actions';
import { getPost } from '../actions/posts.actions';
import { connect } from 'react-redux';
import { VOTE_TYPE } from '../utils/constants';
import PropTypes from 'prop-types';

class Vote extends React.Component {
  state = {
    loading: false
  };
  upVote = () => {
    this.doVote('upVote');
  };
  downVote = () => {
    this.doVote('downVote');
  };
  doVote(vote) {
    const { id, getPost, getComments, voteType } = this.props;

    this.setState({ loading: true }, () => {
      switch (voteType) {
        case VOTE_TYPE.COMMENT:
          voteForComment(id, vote).then(r => {
            if (r && r.id) getComments(r.parentId);
            this.setState({ loading: false });
          });
          break;
        case VOTE_TYPE.POST:
          voteForPost(id, vote).then(r => {
            if (r && r.id) getPost(id);
            this.setState({ loading: false });
          });
          break;
        default:
          this.setState({ loading: false });
          break;
      }
    });
  }
  render() {
    const { vote } = this.props;
    const { loading } = this.state;
    const voteLoadingClass = loading ? 'vote-loading' : '';

    const voteClass = vote < 0 ? 'btn-danger' : 'btn-light';
    const voteScore = Math.abs(vote);
    return (
      <div className={`comment-vote-buttons  ${voteLoadingClass}`}>
        <div className="btn-group" role="group" aria-label="Vote button group">
          <button
            onClick={this.upVote}
            type="button"
            className="btn btn-info"
            disabled={loading}
          >
            <i className="material-icons">arrow_drop_up</i>
          </button>
          <button type="button" className={`btn ${voteClass}`}>
            {voteScore}
          </button>
          <button
            onClick={this.downVote}
            type="button"
            className="btn btn-info"
            disabled={loading}
          >
            <i className="material-icons">arrow_drop_down</i>
          </button>
        </div>
      </div>
    );
  }
}
Vote.propTypes = {
  voteType: PropTypes.oneOf(Object.keys(VOTE_TYPE)).isRequired,
  id: PropTypes.string.isRequired,
  vote: PropTypes.number.isRequired
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getComments: postId => dispatch(commentsActions.getComments(postId)),
    getPost: postId => dispatch(getPost(postId))
  };
};

export default connect(null, mapDispatchToProps)(Vote);
