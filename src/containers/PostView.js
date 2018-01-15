import React from 'react';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import Comments from './CommentList';
import Loading from 'react-loading-animation';
import { connect } from 'react-redux';
import { getPost } from '../actions/posts.actions';

class PostView extends React.Component {
  state = {
    loading: true
  };
  componentWillReceiveProps(nextProps) {
    const { post } = nextProps;
    const { history } = this.props;
    if (post && post.id) this.setState({ loading: false });
    else history.push('/404');
  }
  componentDidMount() {
    const { postId } = this.props.match.params;
    const { getPost } = this.props;
    getPost(postId);
  }
  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;

    const { post } = this.props;

    return (
      <div className="readable-post_view">
        <Post post={post} />
        <hr />
        <Comments postId={post.id} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  post: state.postState.currentPost
});
export default connect(mapStateToProps, { getPost })(withRouter(PostView));
