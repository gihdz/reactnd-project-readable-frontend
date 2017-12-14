import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as postActions from '../actions/posts.actions';

class Posts extends React.Component {
  componentDidMount() {
    const { selectedCategory, getPosts } = this.props;
    getPosts(selectedCategory);
  }

  render() {
    const posts = this.props.posts.map(post => (
      <PostRow key={post.id} post={post} />
    ));
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>timestamp</th>
              <th>title</th>
              <th>body</th>
              <th>author</th>
              <th>category</th>
              <th>vote score</th>
              <th>deleted</th>
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
  return (
    <tr>
      <td>{id}</td>
      <td>{timestamp}</td>
      <td>
        <Link to="/post">{title}</Link>
      </td>
      <td>{body}</td>
      <td>{author}</td>
      <td>{category}</td>
      <td>{voteScore}</td>
      <td>{deleted.toString()}</td>
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
    getPosts: () => dispatch(postActions.getPosts())
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
