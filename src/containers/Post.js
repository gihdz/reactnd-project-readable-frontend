import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPost } from '../actions/posts.actions';
import Loading from 'react-loading-animation';
import Vote from './Vote';
import { VOTE_TYPE } from '../utils/constants';
import EditDelete from './EditDelete';
import { withRouter } from 'react-router-dom';
import { erasePost } from '../utils/api';
import { NotificationManager } from 'react-notifications';

class Post extends React.Component {
  state = {
    loading: false
  };
  onEdit = e => {
    e.preventDefault();
    const { post, history } = this.props;
    history.push(`/post/edit/${post.id}`);
  };
  onDelete = () => {
    this.setState({ loading: true }, () => {
      const { post } = this.props;
      erasePost(post.id).then(r => {
        if (r && r.id) {
          const { history } = this.props;
          history.push('/');
          NotificationManager.success('Post deleted successfully!');
        }
      });
    });
  };

  render() {
    const { loading } = this.state;

    if (loading) return <Loading />;

    const { post, currentPost } = this.props;

    const { title, body, id, voteScore } = currentPost || post;

    return (
      <div className="readable-post">
        <EditDelete onEdit={this.onEdit} onDelete={this.onDelete} />
        <Vote id={id} vote={voteScore} voteType={VOTE_TYPE.POST} />
        <h4 className="title">{title}</h4>
        <div className="body">
          <pre>{body}</pre>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ postState }) => {
  return {
    currentPost: postState.currentPost
  };
};
export default connect(mapStateToProps, { getPost })(withRouter(Post));
