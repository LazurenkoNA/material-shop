import {
  SET_PRODUCT_DESCRIPTION,
  SET_PRODUCT_DESCRIPTION_ERROR,
  SET_PRODUCT_DISCOUNT_PRICE,
  SET_PRODUCT_IMAGE,
  SET_PRODUCT_IMAGE_ERROR,
  SET_PRODUCT_NAME,
  SET_PRODUCT_NAME_ERROR,
  SET_PRODUCT_PRICE,
  SET_PRODUCT_PRICE_ERROR,
} from '../constants/types';

export const setProductName = (name) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_NAME,
    payload: {
      name,
    },
  });
};

export const setProductNameError = (nameError) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_NAME_ERROR,
    payload: {
      nameError,
    },
  });
};

export const setProductDescription = (description) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_DESCRIPTION,
    payload: {
      description,
    },
  });
};

export const setProductDescriptionError = (descriptionError) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_DESCRIPTION_ERROR,
    payload: {
      descriptionError,
    },
  });
};

export const setProductImage = (image) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_IMAGE,
    payload: {
      image,
    },
  });
};

export const setProductImageError = (imageError) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_IMAGE_ERROR,
    payload: {
      imageError,
    },
  });
};

export const setProductPrice = (price) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_PRICE,
    payload: {
      price,
    },
  });
};
export const setProductPriceError = (priceError) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_PRICE_ERROR,
    payload: {
      priceError,
    },
  });
};

export const setProductDiscountPrice = (discountedPrice) => async (dispatch) => {
  dispatch({
    type: SET_PRODUCT_DISCOUNT_PRICE,
    payload: {
      discountedPrice,
    },
  });
};
