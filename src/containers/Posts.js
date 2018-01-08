import React from 'react';
import { connect } from 'react-redux';
import { Link, } from 'react-router-dom';
import * as postActions from '../actions/posts.actions';
import Loading from 'react-loading-animation';
import Vote from './Vote';
import { VOTE_TYPE } from '../utils/constants';
import sortBy from 'sort-by';
import { erasePost } from '../utils/api';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import ReactTooltip from 'react-tooltip'

const SORT_TYPE = {
  ASC: 'ASC',
  DESC: 'DESC',
  NONE: 'NONE'
};
const SORT = {
  NONE: 0,
  ASC: 1,
  DESC: 2
};
const SORT_SEQUENCE = {
  [SORT.NONE]: SORT_TYPE.NONE,
  [SORT.ASC]: SORT_TYPE.ASC,
  [SORT.DESC]: SORT_TYPE.DESC
};
const SORT_SEQUENCE_LENGTH = Object.keys(SORT_SEQUENCE).length;

const SORT_ICON = {
  ASC: 'arrow_drop_up',
  DESC: 'arrow_drop_down',
  NONE: 'remove'
};
const SORT_SIGN = {
  ASC: '',
  DESC: '-'
};

class Posts extends React.Component {
  state = {
    loading: true,
    posts: [],
    voteScoreSort: SORT.NONE,
    dateSort: SORT.DESC
  };
  getPosts() {
    const { getPosts } = this.props;
    getPosts('all', posts => {
      this.setState(
        {
          loading: false,
          posts
        },
        this.sortPosts
      );
    });
  }
  componentDidMount() {
    this.getPosts();
  }
  sortPosts() {
    let { posts, voteScoreSort, dateSort } = this.state;

    let voteTypes = [];
    if (voteScoreSort)
      voteTypes = voteTypes.concat(
        `${SORT_SIGN[SORT_SEQUENCE[voteScoreSort]]}voteScore`
      );
    else if (dateSort)
      voteTypes = voteTypes.concat(
        `${SORT_SIGN[SORT_SEQUENCE[dateSort]]}timestamp`
      );

    posts.sort(sortBy(...voteTypes));

    this.setState({
      posts
    });
  }
  getNextSortType(voteScore) {
    if (voteScore < SORT_SEQUENCE_LENGTH - 1) return voteScore + 1;
    else return 1;
  }
  sortVoteScore = () => {
    let { voteScoreSort } = this.state;
    voteScoreSort = this.getNextSortType(voteScoreSort);
    this.setState(
      {
        voteScoreSort,
        dateSort: 0
      },
      this.sortPosts
    );
  };
  sortTimestamp = () => {
    let { dateSort } = this.state;
    dateSort = this.getNextSortType(dateSort);

    this.setState(
      {
        dateSort,
        voteScoreSort: 0
      },
      this.sortPosts
    );
  };
  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        posts: nextProps.posts
      },
      this.sortPosts
    );
  }
  deletePost = (postId) => {
    this.setState({ loading: true }, () => {
      erasePost(postId).then(r => {
        if (r && r.id) this.getPosts();
      })
    })
  }

  render() {
    const { loading, posts, voteScoreSort, dateSort } = this.state;
    if (loading) return <Loading />;
    const postRows = posts.map(post => <PostRow deletePost={() => this.deletePost(post.id)} key={post.id} post={post} />);

    const voteScoreArrow = SORT_ICON[SORT_SEQUENCE[voteScoreSort]];
    const dateArrow = SORT_ICON[SORT_SEQUENCE[dateSort]];
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th> info </th>
              <th>
                <div className="vote-container">
                  <span>
                    vote score
                    <button
                      className="sort-icon-container"
                      onClick={this.sortVoteScore}>
                      <i className="material-icons">{voteScoreArrow}</i>
                    </button>
                  </span>
                </div>
              </th>
              <th>
                <div className="vote-container">
                  timestamp
                  <span>
                    <button
                      className="sort-icon-container"
                      onClick={this.sortTimestamp}>
                      <i
                        onClick={this.sortTimestamp}
                        className="material-icons sort-icons">
                        {dateArrow}
                      </i>
                    </button>
                  </span>
                </div>
              </th>
              <th>category</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>{postRows}</tbody>
        </table>
        <ReactTooltip />
      </div>
    );
  }
}
class PostRow extends React.Component {
  deleteWarning = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm delete',                        // Title dialog
      message: 'Are you sure to delete this post?',               // Message dialog
      // childrenElement: () => <div>Custom UI</div>,       // Custom UI or Component
      confirmLabel: 'Confirm',                           // Text button confirm
      cancelLabel: 'Cancel',                             // Text button cancel
      onConfirm: () => {
        const { deletePost } = this.props;
        deletePost();
      },    // Action after Confirm
      onCancel: () => { },      // Action after Cancel
    })

  }
  render() {
    const { post } = this.props;
    const {
    id,
      timestamp,
      title,
      body,
      author,
      voteScore,
      category
  } = post;
    const date = new Date(timestamp).toLocaleDateString();

    return (
      <tr>
        <td>
          <div>
            <div> Title:</div>
            <Link
              to={`/viewPost/${id}`}>
              {title}
            </Link>
          </div>
          <div>
            <strong>
              Author:<span> {author}</span>
            </strong>
          </div>
          <div>
            <div>Body:</div>
            <Link
              to={`/viewPost/${id}`}>
              <pre> {body} </pre>
            </Link>
          </div>
        </td>
        <td>
          <Vote id={id} vote={voteScore} voteType={VOTE_TYPE.POSTS} />
        </td>
        <td> {date} </td>
        <td>{category}</td>

        <td>
          <div className="action-group">
            <Link data-tip="Edit Post"
              to={`/post/${id}`}>
              <i className="material-icons">mode_edit</i>
            </Link>
            <a data-tip="Delete Post" href="#delete-post" onClick={this.deleteWarning}>
              <i className="material-icons">remove_circle</i>
            </a>
          </div>
        </td>
      </tr>
    );
  }
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
