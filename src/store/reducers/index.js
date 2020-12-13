import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import productReducer from './productReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  product: productReducer,
  products: productsReducer,
});

export default rootReducer;
