import React from 'react';
import { connect } from 'react-redux';
import { getPost } from '../actions/posts.actions';
class Post extends React.Component {
  componentDidMount() {
    const { postId } = this.props;
    this.props.getPost(postId);
  }
  render() {
    const { post } = this.props;
    if (!post) return false;
    const { title, body } = post;
    return (
      <div className="readable-post">
        <h4>{title}</h4>
        <div className="readable-post-body">{body}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ postState }) => {
  return {
    post: postState.currentPost
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPost: postId => dispatch(getPost(postId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
