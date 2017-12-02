import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import * as commentActions from '../actions/comments.actions';
class CommentList extends Component {
  constructor() {
    super();
    this.getComments = this.getComments.bind(this);
  }

  getComments() {
    // return () => {
    console.log('manin, pero klk');
    this.props.getAsyncComments();
    // }
  }

  render() {
    const commentsLi = this.props.comments.map(c => (
      <li key={c.id}>{c.text}</li>
    ));

    return (
      <div className="comment-list">
        <ul>{commentsLi}</ul>
        <button className="get-comments" onClick={this.getComments}>
          Get Comments
        </button>
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: propTypes.array.isRequired,
  getAsyncComments: propTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAsyncComments: dispatch(commentActions.getAsyncComments)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
