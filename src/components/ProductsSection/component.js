import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useProductsSection from './hook';
import Card from './Card';
import deleteData from '../../utils/deleteData';
import setProducts from '../../store/actions/productsActions';
import { setProductKey } from '../../store/actions/productActions';

const ProductsSection = () => {
  const dispatch = useDispatch();
  const { classes, products } = useProductsSection();
  const { key: productKey } = useSelector((state) => state.product);

  // Modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    dispatch(setProductKey(id));
  };

  const handleClickClose = () => {
    setOpen(false);
    dispatch(setProductKey(''));
  };

  const handleDelete = () => {
    // Delete in bd
    deleteData('products', productKey);

    // Delete in state
    const newProducts = { ...products };
    delete newProducts[productKey];
    dispatch(setProducts({ ...newProducts }));
    setOpen(false);
  };

  return (
    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
      {products && (
        <Grid container className={classes.root} justify="center" spacing={3}>
          {Object.keys(products).map((key) => (
            <Grid key={key} item>
              <Card id={key} handleClickOpen={handleClickOpen} />
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={open}>
        <DialogTitle>Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>Delete card?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsSection;
