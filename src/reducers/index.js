import { combineReducers } from 'redux';
import comments from './comments.reducer';

const rootReducer = combineReducers({
  comments
});

export default rootReducer;
