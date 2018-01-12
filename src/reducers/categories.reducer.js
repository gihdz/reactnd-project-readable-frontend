import * as actions from '../constants';
const categoryState = {
  selectedCategory: 'all',
  categories: []
};
export default function categoriesReducer(state = categoryState, action) {
  switch (action.type) {
    case actions.GET_CATEGORIES:
      return { ...state, categories: [...action.categories] };
    case actions.SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: action.selectedCategory };
    default:
      return state;
  }
}
