import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import createTheme from '../../utils/createTheme';
import fire from '../../utils/firebase';
import { setEmail, setPassword, setUser } from '../../store/actions/loginActions';

const useApp = () => {
  const { theme } = createTheme();
  const dispatch = useDispatch();

  const clearInputs = () => {
    dispatch(setEmail(''));
    dispatch(setPassword(''));
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((userName) => {
      if (userName) {
        clearInputs();
        dispatch(setUser(userName));
      } else {
        dispatch(setUser(''));
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return {
    theme,
    authListener,
  };
};

export default useApp;
