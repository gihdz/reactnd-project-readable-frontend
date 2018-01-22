import { GET_POSTS, LOADING_POSTS, GET_POST } from '../constants';
import { fetchPosts, fetchPostById } from '../utils/api';

export const getPosts = (category = 'all', successCb) => {
  return (dispatch, state) => {
    fetchPosts(category).then(posts => {
      dispatch({
        type: GET_POSTS,
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
        type: GET_POST,
        post
      });
      if (successCb) successCb(post);
    });
  };
};

export const setLoadingPosts = loading => ({
  type: LOADING_POSTS,
  loadingPosts: loading
});
