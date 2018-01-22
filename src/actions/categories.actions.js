import { SET_SELECTED_CATEGORY, GET_CATEGORIES } from '../constants';
import { fetchCategories } from '../utils/api';

export const setCurrentCategory = selectedCategory => {
  return dispatch => {
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
