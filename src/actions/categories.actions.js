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

export const getCategories = () => {
  return dispatch => {
    fetchCategories().then(categories => {
      const defaulCategoriesValue = { name: 'all', path: 'all' };
      categories = [defaulCategoriesValue, ...categories];
      dispatch({
        type: actions.GET_CATEGORIES,
        categories
      });
    });
  };
};
