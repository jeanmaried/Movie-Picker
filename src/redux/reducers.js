import { combineReducers } from 'redux';
import movieParams from './modules/state';

export default combineReducers({
  state: movieParams
});
