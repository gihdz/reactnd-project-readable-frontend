import * as actions from '../constants';
const categoriesState = {
  selectedCategory: 'all',
  categories: []
};
export default function categoriesReducer(state = categoriesState, action) {
  switch (action.type) {
    case actions.GET_CATEGORIES:
      return { ...state, categories: [...action.categories] };
    case actions.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.selectedCategory };
    default:
      return state;
  }
}
