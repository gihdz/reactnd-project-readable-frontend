import * as actions from '../constants';
import { fetchPosts, fetchPostById } from '../utils/api';

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
export const getPost = postId => {
  return dispatch => {
    fetchPostById(postId).then(post => {
      dispatch({
        type: actions.GET_POST,
        post
      });
    });
  };
};
