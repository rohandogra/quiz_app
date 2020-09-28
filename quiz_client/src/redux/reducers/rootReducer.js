import { combineReducers } from 'redux';
import quiz from '../reducers/quizReducer';

const rootReducer = combineReducers({
  quiz,
});
export default rootReducer;
