import {
  SET_EMAIL,
  SET_EMAIL_ERROR,
  SET_HAS_ACCOUNT,
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SET_USER,
} from '../constants/types';

const initState = {
  user: '',
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  hasAccount: '',
};

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };
    case SET_EMAIL_ERROR:
      return {
        ...state,
        emailError: action.payload.emailError,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
      };
    case SET_PASSWORD_ERROR:
      return {
        ...state,
        passwordError: action.payload.passwordError,
      };
    case SET_HAS_ACCOUNT:
      return {
        ...state,
        hasAccount: action.payload.hasAccount,
      };
    default:
      return state;
  }
};

export default loginReducer;
