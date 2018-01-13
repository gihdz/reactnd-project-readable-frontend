import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../actions/posts.actions';
import Loading from 'react-loading-animation';
import sortBy from 'sort-by';
import { erasePost } from '../utils/api';
import ReactTooltip from 'react-tooltip';
import PostRow from './PostRow';

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
    const { getPosts, category } = this.props;
    const cat = category || 'all';
    getPosts(cat, posts => {
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
  deletePost = postId => {
    this.setState({ loading: true }, () => {
      erasePost(postId).then(r => {
        if (r && r.id) this.getPosts();
      });
    });
  };

  render() {
    const { loading, posts, voteScoreSort, dateSort } = this.state;
    const { loadingPosts } = this.props;
    if (loading || loadingPosts) return <Loading />;
    const postRows = posts.map(post => (
      <PostRow
        deletePost={() => this.deletePost(post.id)}
        key={post.id}
        post={post}
      />
    ));

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
                      onClick={this.sortVoteScore}
                    >
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
                      onClick={this.sortTimestamp}
                    >
                      <i
                        onClick={this.sortTimestamp}
                        className="material-icons sort-icons"
                      >
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

const mapStateToProps = ({ categoryState, postState }, ownProps) => {
  const { posts, loadingPosts } = postState;
  return {
    posts,
    selectedCategory: categoryState.selectedCategory,
    loadingPosts
  };
};
export default connect(mapStateToProps, { getPosts })(Posts);

//Post fields
// id	String	Unique identifier
// timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
// title	String	Post title
// body	String	Post body
// author	String	Post author
// category	String	Should be one of the categories provided by the server
// voteScore	Integer	Net votes the post has received (default: 1)
// deleted	Boolean	Flag if post has been 'deleted' (inaccessible by the front end), (default: false)
