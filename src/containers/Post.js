import React from 'react';
import { connect } from 'react-redux';
import { getPost } from '../actions/posts.actions';
import Loading from 'react-loading-animation';
class Post extends React.Component {
  state = {
    loading: true
  };
  componentDidMount() {
    const { postId } = this.props;
    this.props.getPost(postId, () => {
      this.setState({ loading: false });
    });
  }
  render() {
    const { loading } = this.state;

    if (loading) return <Loading />;

    const { post } = this.props;
    const { title, body } = post;

    return (
      <div className="readable-post">
        <h4 className="title">{title}</h4>
        <div className="body">{body}</div>
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
    getPost: (postId, cb) => dispatch(getPost(postId, cb))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
