import * as actions from '../constants';
const comments = [];

export default function commentsReducer(state = comments, action) {
  switch (action.type) {
    case actions.GET_COMMENTS:
      return [...state, ...action.comments];
    default:
      return state;
  }
}
