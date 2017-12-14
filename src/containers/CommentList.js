import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import * as commentActions from '../actions/comments.actions';
class CommentList extends Component {
  constructor(props) {
    super(props);
    // this.getComments = this.getComments.bind(this);
  }

  // getComments() {
  //   console.log('manin, pero klk');
  //   this.props.getAsyncComments();
  // }

  render() {
    // const commentsLi = this.props.comments.map(c => (
    //   <li key={c.id}>{c.text}</li>
    // ));

    return <div className="redable-comment-list">comments!</div>;
  }
}

CommentList.propTypes = {
  // comments: propTypes.array.isRequired,
  // getAsyncComments: propTypes.func.isRequired
};

const mapStateToProps = ({ comments }, ownProps) => {
  return {
    comments
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAsyncComments: () => dispatch(commentActions.getAsyncComments())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
