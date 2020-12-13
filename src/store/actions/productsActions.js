import { SET_BD_PRODUCTS } from '../constants/types';

const setProducts = (products) => async (dispatch) => {
  dispatch({
    type: SET_BD_PRODUCTS,
    payload: {
      products,
    },
  });
};

export default setProducts;
