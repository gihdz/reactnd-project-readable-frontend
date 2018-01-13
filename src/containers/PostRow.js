import React from 'react';
import { withRouter } from 'react-router-dom';
import { VOTE_TYPE } from '../utils/constants';
import EditDelete from './EditDelete';
import { Link } from 'react-router-dom';
import Vote from './Vote';

class PostRow extends React.Component {
  onDelete = () => {
    const { deletePost } = this.props;
    deletePost();
  };
  onEdit = () => {
    const { post } = this.props;
    const { id } = post;
    const { history } = this.props;
    history.push(`/post/edit/${id}`);
  };
  render() {
    const { post } = this.props;
    const {
      id,
      timestamp,
      title,
      body,
      author,
      voteScore,
      category,
      commentCount
    } = post;
    const date = new Date(timestamp).toLocaleDateString();

    return (
      <tr>
        <td>
          <div>
            <div> Title:</div>
            <Link to={`/${category}/${id}`}>{title}</Link>
          </div>
          <div>
            <strong>
              Author:<span> {author}</span>
            </strong>
          </div>
          <div>
            <span>Comments count: </span>
            <strong>{commentCount}</strong>
          </div>
          <div>
            <div>Body:</div>
            <Link to={`/viewPost/${id}`}>
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
          <EditDelete onEdit={this.onEdit} onDelete={this.onDelete} />
        </td>
      </tr>
    );
  }
}

export default withRouter(PostRow);
