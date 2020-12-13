import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import fire from '../../utils/firebase';
import {
  setEmail,
  setEmailError,
  setPassword,
  setPasswordError,
} from '../../store/actions/loginActions';

const useLoginForm = () => {
  const dispatch = useDispatch();
  const classes = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    switchButton: {
      background: 'transparent',
    },
  }))();

  const { email, password } = useSelector((state) => state.login);

  const clearInputs = () => {
    dispatch(setEmail(''));
    dispatch(setPassword(''));
  };
  const clearErrors = () => {
    dispatch(setEmailError(''));
    dispatch(setPasswordError(''));
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disables':
          case 'auth/user-not-found':
            dispatch(setEmailError(error.message));
            break;
          case 'auth/wrong-password':
            dispatch(setPasswordError(error.message));
            break;
          default:
            break;
        }
      });
  };

  const handleSignUp = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            dispatch(setEmailError(error.message));
            break;
          case 'auth/weak-password':
            dispatch(setPasswordError(error.message));
            break;
          default:
            break;
        }
      });
  };

  return { classes, handleLogin, clearInputs, handleSignUp };
};

export default useLoginForm;
