import React from 'react';
import Post from './Post';
import Comments from './CommentList';

class PostView extends React.Component {
  render() {
    return (
      <div className="readable-post_view">
        <Post />
        <Comments />
      </div>
    );
  }
}

export default PostView;
