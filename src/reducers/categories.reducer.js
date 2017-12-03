import * as actions from '../constants';
const categoriesState = {
  selectedCategory: 'all',
  categories: []
};
export default function categoriesReducer(state = categoriesState, action) {
  // console.log('Categories Reducer state:', state);
  // console.log('action:', action);
  switch (action.type) {
    case actions.GET_CATEGORIES:
      const defaulCategoriesValue = { name: 'all', path: 'all' };
      const categories = [defaulCategoriesValue, ...action.categories];
      return { ...state, categories };
    case actions.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.selectedCategory };
    default:
      return state;
  }
}
