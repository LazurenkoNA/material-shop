import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const classes = makeStyles((theme) => ({
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  }))();

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3">
        Login
      </Typography>
      <LoginForm />
    </div>
  );
};

export default Login;
