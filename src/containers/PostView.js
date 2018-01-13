import React from 'react';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import Comments from './CommentList';
import Loading from 'react-loading-animation';
import { fetchPostById } from '../utils/api';

class PostView extends React.Component {
  state = {
    loading: true,
    post: {}
  };
  componentDidMount() {
    const { postId } = this.props.match.params;
    const { history } = this.props;
    fetchPostById(postId).then(post => {
      if (post && post.id) this.setState({ post, loading: false });
      else history.push('/404');
    });
  }
  render() {
    const { loading, post } = this.state;
    if (loading) return <Loading />;

    return (
      <div className="readable-post_view">
        <Post post={post} />
        <hr />
        <Comments postId={post.id} />
      </div>
    );
  }
}

export default withRouter(PostView);
