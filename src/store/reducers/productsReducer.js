import { SET_BD_PRODUCTS } from '../constants/types';

const initState = {};

const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_BD_PRODUCTS:
      return {
        ...action.payload.products,
      };
    default:
      return state;
  }
};

export default productsReducer;
