import * as actions from '../constants';
import { fetchPosts, fetchPostById } from '../utils/api';

export const getPosts = (category = 'all', successCb) => {
  return dispatch => {
    fetchPosts(category).then(posts => {
      dispatch({
        type: actions.GET_POSTS,
        posts
      });
      if (successCb) successCb(posts);
    });
  };
};
export const getPost = (postId, successCb = null) => {
  return dispatch => {
    fetchPostById(postId).then(post => {
      dispatch({
        type: actions.GET_POST,
        post
      });
      if (successCb) successCb();
    });
  };
};
