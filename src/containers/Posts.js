import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as postActions from '../actions/posts.actions';
import Loading from 'react-loading-animation';
import Vote from './Vote';
import { VOTE_TYPE } from '../utils/constants';

class Posts extends React.Component {
  state = {
    loading: true
  };
  componentDidMount() {
    const { getPosts } = this.props;
    getPosts('all', () => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;
    const posts = this.props.posts.map(post => (
      <PostRow key={post.id} post={post} />
    ));
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>info</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>{posts}</tbody>
        </table>
      </div>
    );
  }
}
const PostRow = ({ post }) => {
  const {
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  } = post;
  const date = new Date(timestamp).toLocaleDateString();

  return (
    <tr>
      <td>
        <Vote id={id} vote={voteScore} voteType={VOTE_TYPE.POSTS} />
        <div>
          <div>Title:</div>
          <Link to={`/viewPost/${id}`}>{title}</Link>
        </div>
        <div>
          <strong>
            Author: <span>{author}</span>
          </strong>
          ,{' '}
          <strong>
            Date: <span>{date}</span>
          </strong>
        </div>
        <div>
          <div>Body:</div>
          <Link to={`/viewPost/${id}`}>
            <pre>{body}</pre>
          </Link>
        </div>
      </td>
      <td>
        <Link to={`/post/${id}`}>Edit Post</Link>
      </td>
    </tr>
  );
};

const mapStateToProps = ({ categoryState, postState }, ownProps) => {
  return {
    posts: postState.posts,
    selectedCategory: categoryState.selectedCategory
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPosts: (category, cb) => dispatch(postActions.getPosts(category, cb))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);

//Post fields
// id	String	Unique identifier
// timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
// title	String	Post title
// body	String	Post body
// author	String	Post author
// category	String	Should be one of the categories provided by the server
// voteScore	Integer	Net votes the post has received (default: 1)
// deleted	Boolean	Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
