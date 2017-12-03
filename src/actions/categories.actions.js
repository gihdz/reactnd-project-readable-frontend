import * as actions from '../constants';
import { fetchCategories } from '../utils/api';

export const getCategoriesAsync = (dispatch, getState) => {
  return () => {
    console.log('mira manin, soy un estado (categories)', getState());
    fetchCategories().then(categories => {
      dispatch({
        type: actions.GET_CATEGORIES,
        categories
      });
    });
  };
};
