import * as actions from '../constants';
import { fetchCategories, fetchPosts } from '../utils/api';

export const setCurrentCategory = selectedCategory => {
  return dispatch => {
    fetchPosts(selectedCategory).then(posts => {
      dispatch({
        type: actions.GET_POSTS,
        posts
      });
    });
    dispatch({
      type: actions.SET_SELECTED_CATEGORY,
      selectedCategory
    });
  };
};

export const getCategoriesAsync = () => {
  return dispatch => {
    fetchCategories().then(categories => {
      dispatch({
        type: actions.GET_CATEGORIES,
        categories
      });
    });
  };
};
