import React from 'react';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setHasAccount, setPassword } from '../../store/actions/loginActions';
import useLoginForm from './hook';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { handleLogin, handleSignUp, classes } = useLoginForm();
  const { email, emailError, password, passwordError, hasAccount } = useSelector(
    (state) => state.login
  );
  return (
    <>
      <form>
        <Box>
          <TextField
            required
            className={classes.margin}
            value={email}
            autoFocus
            onInput={(e) => dispatch(setEmail(e.target.value))}
            label="E-mail"
            error={!!emailError}
            helperText={emailError}
            variant="outlined"
          />
          <TextField
            required
            className={classes.margin}
            label="Password"
            value={password}
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            type="password"
            variant="outlined"
          />
        </Box>
        <Box>
          <Button
            className={classes.margin}
            onClick={hasAccount ? handleLogin : handleSignUp}
            variant="outlined"
            color="primary"
          >
            {hasAccount ? 'Sign in' : 'Sign up'}
          </Button>
          <Typography>{hasAccount ? `Don't have account?` : `Have account?`}</Typography>{' '}
          <Button
            type="button"
            onClick={() => dispatch(setHasAccount(!hasAccount))}
            size="small"
            color="primary"
          >
            {hasAccount ? 'Sign up' : 'Sign in'}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default LoginForm;
