import React from 'react';
import Post from './Post';
import Comments from './CommentList';

class PostView extends React.Component {
  render() {
    const { postId } = this.props.match.params;
    return (
      <div className="readable-post_view">
        <Post postId={postId} />
        <hr />
        <Comments postId={postId} />
      </div>
    );
  }
}

export default PostView;
