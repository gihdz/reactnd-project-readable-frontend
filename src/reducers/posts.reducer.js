import * as actions from '../constants';
const postState = {
  posts: []
};
export default function postsReducer(state = postState, action) {
  switch (action.type) {
    case actions.GET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    default:
      return state;
  }
}
