import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import location from './location';
import category from './category';

export default combineReducers({
  router: routerReducer,
  location,
  category
});
