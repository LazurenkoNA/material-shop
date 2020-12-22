import React from 'react';
import { Box, Button, Fab, Snackbar, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { NavigateBefore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useProductForm from './hook';
import Alert from '../Alert';

const ProductForm = () => {
  const { key, image } = useSelector((state) => state.product);
  const {
    openAlert,
    handleAlertClose,
    useStyles,
    // handleSendData,
    formik,
    handleSetImage,
  } = useProductForm();
  const classes = useStyles();

  console.log(formik);

  return (
    <div className={classes.root}>
      <Link to="/">
        <Fab size="medium" className={classes.fab} color="primary">
          <NavigateBefore fontSize="large" />
        </Fab>
      </Link>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h2" component="h1" className={classes.title}>
          {key ? 'Edit Product' : 'Add Product'}
        </Typography>
        <Box>
          <TextField
            required
            value={formik.values.name}
            autoFocus
            fullWidth
            multiline
            id="name"
            name="name"
            className={classes.inputItem}
            onChange={formik.handleChange}
            label="Name"
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
          />
          <TextField
            className={classes.inputItem}
            value={formik.values.description}
            multiline
            fullWidth
            id="description"
            name="description"
            onChange={formik.handleChange}
            label="Description"
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            required
            value={formik.values.price}
            type="number"
            id="price"
            name="price"
            className={classes.inputItem}
            onChange={formik.handleChange}
            label="Price, $"
            error={formik.touched.price && !!formik.errors.price}
            helperText={formik.touched.price && formik.errors.price}
            variant="outlined"
          />
        </Box>
        <Box className={classes.file}>
          <label htmlFor="button-file" className={classes.fileButton} onChange={handleSetImage}>
            <input
              accept="image/*"
              className={classes.input}
              id="button-file"
              multiple
              type="file"
            />
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          <Typography component="h6" variant="h6">
            {image ? image.name || image : 'Load File *'}
          </Typography>
        </Box>
        <Box>
          <TextField
            className={classes.inputItem}
            label="Sale, %"
            id="discountedPrice"
            name="discountedPrice"
            value={formik.values.discountedPrice}
            onChange={formik.handleChange}
            error={formik.touched.discountedPrice && !!formik.errors.discountedPrice}
            helperText={formik.touched.discountedPrice && formik.errors.discountedPrice}
            variant="outlined"
          />
          <TextField
            label="Discount time to:"
            type="date"
            id="discountedDate"
            name="discountedDate"
            variant="outlined"
            value={formik.values.discountedDate}
            onChange={formik.handleChange}
            error={formik.touched.discountedDate && !!formik.errors.discountedDate}
            helperText={formik.touched.discountedDate && formik.errors.discountedDate}
            className={classes.inputItem}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box className={classes.submitButton}>
          {/* <Link to="/"> */}
          <Button
            type="submit"
            color="primary"
            size="large"
            variant="outlined"
            // onClick={handleSendData}
          >
            {key ? 'Update Data' : 'Add'}
          </Button>
          {/* </Link> */}
        </Box>
      </form>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductForm;
