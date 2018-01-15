import React from 'react';
import EditDelete from './EditDelete';
import PropTypes from 'prop-types';
import Vote from './Vote';
import { VOTE_TYPE } from '../utils/constants';

class Comment extends React.Component {
  onDelete = e => {
    const { deleteComment } = this.props;
    deleteComment();
  };
  render() {
    const { comment, setCurrentComment } = this.props;
    const { id, body, author, voteScore } = comment;
    return (
      <li className="list-group-item">
        <div className="readable-comment">
          <Vote vote={voteScore} id={id} voteType={VOTE_TYPE.COMMENT} />
          <EditDelete
            editTooltip="Edit Comment"
            deleteTooltip="Delete Comment"
            onEdit={setCurrentComment}
            onDelete={this.onDelete}
          />

          <h5>
            <strong>{author}</strong>{' '}
          </h5>
          <pre className="body">{body}</pre>
        </div>
      </li>
    );
  }
}
/* Comment fields
  id	String	Unique identifier
  parentId	String	id of the parent post
  timestamp	Integer	Time created - default data tracks this in Unix time. You can use Date.now() to get this number
  body	String	Comment body
  author	String	Comment author
  voteScore	Integer	Net votes the comment has received (default: 1)
  deleted	Boolean	Flag if comment has been 'deleted' (inaccessible by the front end), (default: false)
  parentDeleted	Boolean	Flag for when the the parent post was deleted, but the comment itself was not.
  
  */
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  setCurrentComment: PropTypes.func.isRequired
};

export default Comment;
