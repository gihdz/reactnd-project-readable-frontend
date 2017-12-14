import { combineReducers } from 'redux';
import comments from './comments.reducer';
import categoryState from './categories.reducer';
import postState from './posts.reducer';

const rootReducer = combineReducers({
  comments,
  categoryState,
  postState
});

export default rootReducer;
