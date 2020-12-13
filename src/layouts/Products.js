import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import handleLogout from '../utils/handleLogout';
import ProductsSection from '../components/ProductsSection/component';

const Products = () => {
  const classes = makeStyles((theme) => ({
    root: {
      textAlign: 'center',
      position: 'relative',
    },
    logout: {
      position: 'absolute',
      top: theme.spacing(3),
      right: theme.spacing(3),
    },
  }))();

  return (
    <div className={classes.root}>
      <Typography variant="h1">Products</Typography>
      <Button className={classes.logout} onClick={handleLogout} variant="outlined" color="primary">
        Logout
      </Button>
      <ProductsSection />
    </div>
  );
};

export default Products;
