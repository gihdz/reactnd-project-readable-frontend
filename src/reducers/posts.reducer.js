import * as actions from '../constants';
const postState = {
  posts: [],
  currentPost: null
};
export default function postsReducer(state = postState, action) {
  switch (action.type) {
    case actions.GET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    case actions.GET_POST:
      return {
        ...state,
        currentPost: { ...action.post }
      };
    default:
      return state;
  }
}
