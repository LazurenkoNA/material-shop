import {
  SET_EMAIL,
  SET_EMAIL_ERROR,
  SET_HAS_ACCOUNT,
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SET_USER,
} from '../constants/types';

export const setUser = (user) => async (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: {
      user,
    },
  });
};
export const setEmail = (email) => async (dispatch) => {
  dispatch({
    type: SET_EMAIL,
    payload: {
      email,
    },
  });
};
export const setEmailError = (emailError) => async (dispatch) => {
  dispatch({
    type: SET_EMAIL_ERROR,
    payload: {
      emailError,
    },
  });
};
export const setPassword = (password) => async (dispatch) => {
  dispatch({
    type: SET_PASSWORD,
    payload: {
      password,
    },
  });
};
export const setPasswordError = (passwordError) => async (dispatch) => {
  dispatch({
    type: SET_PASSWORD_ERROR,
    payload: {
      passwordError,
    },
  });
};
export const setHasAccount = (hasAccount) => async (dispatch) => {
  dispatch({
    type: SET_HAS_ACCOUNT,
    payload: {
      hasAccount,
    },
  });
};
