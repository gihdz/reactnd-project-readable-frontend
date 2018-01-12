import {
  GET_POSTS,
  SET_SELECTED_CATEGORY,
  GET_CATEGORIES,
  LOADING_POSTS
} from '../constants';
import { fetchCategories, fetchPosts } from '../utils/api';

export const setCurrentCategory = selectedCategory => {
  return dispatch => {
    dispatch({ type: LOADING_POSTS, loadingPosts: true });
    fetchPosts(selectedCategory).then(posts => {
      dispatch({
        type: GET_POSTS,
        posts
      });
      dispatch({ type: LOADING_POSTS, loadingsPosts: false });
    });
    dispatch({
      type: SET_SELECTED_CATEGORY,
      selectedCategory
    });
  };
};

export const getCategories = () => {
  return dispatch => {
    fetchCategories().then(categories => {
      const defaulCategoriesValue = { name: 'all', path: 'all' };
      categories = [defaulCategoriesValue, ...categories];
      dispatch({
        type: GET_CATEGORIES,
        categories
      });
    });
  };
};
