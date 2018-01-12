import { GET_POSTS, GET_POST, LOADING_POSTS } from '../constants';
const postState = {
  posts: [],
  currentPost: null,
  loadingPosts: false
};
export default function postsReducer(state = postState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts
      };
    case GET_POST:
      return {
        ...state,
        currentPost: { ...action.post }
      };
    case LOADING_POSTS:
      return {
        ...state,
        loadingPosts: action.loadingPosts
      };
    default:
      return state;
  }
}
