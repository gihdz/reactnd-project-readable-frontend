import React from 'react';
import { voteForComment, voteForPost } from '../utils/api';
import { getComments } from '../actions/comments.actions';
import { getPost, getPosts } from '../actions/posts.actions';
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
    const {
      id,
      getPost,
      getPosts,
      getComments,
      voteType,
      selectedCategory
    } = this.props;

    this.setState({ loading: true }, () => {
      const setLoadingFalse = () => {
        this.setState({ loading: false });
      };
      switch (voteType) {
        case VOTE_TYPE.COMMENT:
          voteForComment(id, vote).then(r => {
            if (r && r.id) getComments(r.parentId, setLoadingFalse);
          });
          break;
        case VOTE_TYPE.POST:
        case VOTE_TYPE.POSTS:
          voteForPost(id, vote).then(r => {
            if (r && r.id) {
              if (voteType === VOTE_TYPE.POST) getPost(id, setLoadingFalse);
              if (voteType === VOTE_TYPE.POSTS)
                getPosts(selectedCategory, setLoadingFalse);
            }
          });
          break;
        default:
          setLoadingFalse();
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
const mapStateToProps = ({ categoryState }) => {
  const { selectedCategory } = categoryState;
  return {
    selectedCategory
  };
};
export default connect(mapStateToProps, { getPost, getPosts, getComments })(
  Vote
);
