import * as actions from '../constants';
const categories = [{ name: 'all', path: 'all' }];

export default function commentsReducer(state = categories, action) {
  switch (action.type) {
    case actions.GET_CATEGORIES:
      return [...state, ...action.categories];
    default:
      return state;
  }
}
