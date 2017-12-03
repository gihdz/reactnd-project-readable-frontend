import { combineReducers } from 'redux';
import comments from './comments.reducer';
import categories from './categories.reducer';

const rootReducer = combineReducers({
  comments,
  categories
});

export default rootReducer;
