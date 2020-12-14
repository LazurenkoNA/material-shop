import React from 'react';
import { Button, Fab, makeStyles, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import handleLogout from '../utils/handleLogout';
import ProductsSection from '../components/ProductsSection/component';
import { setProductKey } from '../store/actions/productActions';

const Products = () => {
  const dispatch = useDispatch();
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
    addCard: {
      position: 'fixed',
      right: theme.spacing(3),
      bottom: theme.spacing(3),
    },
  }))();

  const handleKey = () => {
    dispatch(setProductKey(''));
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">Products</Typography>
      <Button className={classes.logout} onClick={handleLogout} variant="outlined" color="primary">
        Logout
      </Button>
      <ProductsSection />
      <Link to="/add-product" onClick={handleKey}>
        <Fab className={classes.addCard} color="primary">
          <Add />
        </Fab>
      </Link>
    </div>
  );
};

export default Products;
