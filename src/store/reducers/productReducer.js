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

const initState = {
  name: '',
  nameError: '',
  description: '',
  descriptionError: '',
  image: null,
  imageError: '',
  price: '',
  priceError: '',
  discountedPrice: '',
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PRODUCT_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case SET_PRODUCT_NAME_ERROR:
      return {
        ...state,
        nameError: action.payload.nameError,
      };
    case SET_PRODUCT_DESCRIPTION:
      return {
        ...state,
        description: action.payload.description,
      };
    case SET_PRODUCT_DESCRIPTION_ERROR:
      return {
        ...state,
        descriptionError: action.payload.descriptionError,
      };
    case SET_PRODUCT_IMAGE:
      return {
        ...state,
        image: action.payload.image,
      };
    case SET_PRODUCT_IMAGE_ERROR:
      return {
        ...state,
        imageError: action.payload.imageError,
      };
    case SET_PRODUCT_PRICE:
      return {
        ...state,
        price: action.payload.price,
      };
    case SET_PRODUCT_PRICE_ERROR:
      return {
        ...state,
        priceError: action.payload.priceError,
      };
    case SET_PRODUCT_DISCOUNT_PRICE:
      return {
        ...state,
        discountedPrice: action.payload.discountedPrice,
      };
    default:
      return state;
  }
};

export default productReducer;