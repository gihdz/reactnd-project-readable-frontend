import * as actions from '../constants';
import { fetchPosts } from '../utils/api';

export const getPosts = (category = 'all') => {
  return dispatch => {
    fetchPosts(category).then(posts => {
      dispatch({
        type: actions.GET_POSTS,
        posts
      });
    });
  };
};
