import { combineReducers } from 'redux';
import comments from './comments.reducer';
import categoryState from './categories.reducer';

const rootReducer = combineReducers({
  comments,
  categoryState
});

export default rootReducer;
