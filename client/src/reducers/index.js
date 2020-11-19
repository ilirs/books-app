import { combineReducers } from 'redux';
import loginReducer from './login';
import booksReducer from './books';

const reducers = combineReducers({
  loginReducer,
  booksReducer,
});

export default reducers;