import * as actions from '../constants';
const comments = [];

export default function commentsReducer(state = comments, action) {
  switch (action.type) {
    case actions.GET_POST_COMMENTS:
      return [...action.comments];
    default:
      return state;
  }
}
