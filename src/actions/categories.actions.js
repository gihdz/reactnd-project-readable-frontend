import * as actions from '../constants';
import { fetchCategories } from '../utils/api';
export const setCurrentCategory = dispatch => {
  return selectedCategory => {
    dispatch({
      type: actions.SET_SELECTED_CATEGORY,
      selectedCategory
    });
  };
};
export const getCategoriesAsync = (dispatch, getState) => {
  return () => {
    fetchCategories().then(categories => {
      dispatch({
        type: actions.GET_CATEGORIES,
        categories
      });
    });
  };
};
