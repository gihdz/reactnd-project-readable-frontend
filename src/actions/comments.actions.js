import * as actions from '../constants';
import { fetchCommentsOfPost } from '../utils/api';

export const getComments = (postId, successCb) => {
  return dispatch => {
    fetchCommentsOfPost(postId).then(comments => {
      dispatch({
        type: actions.GET_POST_COMMENTS,
        comments
      });
      if (successCb) successCb();
    });
  };
};
