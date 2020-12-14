import React from 'react';
import { Box, Button, Snackbar, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useProductForm from './hook';
import Alert from '../Alert';

const ProductForm = () => {
  const {
    key,
    name,
    nameError,
    description,
    descriptionError,
    price,
    priceError,
    image,
    discountedPrice,
    discountedPriceError,
    discountedDate,
  } = useSelector((state) => state.product);
  const {
    openAlert,
    handleAlertClose,
    useStyles,
    handleSendData,
    handlerSetProductName,
    handlerSetProductDescription,
    handlerSetProductPrice,
    handlerSetDiscountPrice,
    handleSetImage,
  } = useProductForm();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h1" className={classes.title}>
        Add Product
      </Typography>
      <Box>
        <TextField
          required
          value={name}
          autoFocus
          multiline
          className={classes.inputItem}
          onChange={handlerSetProductName}
          label="Name"
          error={!!nameError}
          helperText={nameError}
          variant="outlined"
        />
        <TextField
          className={classes.inputItem}
          value={description}
          multiline
          onChange={handlerSetProductDescription}
          label="Description"
          error={!!descriptionError}
          helperText={descriptionError}
          variant="outlined"
        />
      </Box>
      <Box>
        <TextField
          required
          value={price}
          className={classes.inputItem}
          onInput={handlerSetProductPrice}
          label="Price, $"
          error={!!priceError}
          helperText={priceError}
          variant="outlined"
        />
      </Box>
      <Box className={classes.file}>
        <label htmlFor="button-file" className={classes.fileButton} onChange={handleSetImage}>
          <input accept="image/*" className={classes.input} id="button-file" multiple type="file" />
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <Typography component="h6" variant="h6">
          {image ? image.name || image : 'Load File'}
        </Typography>
      </Box>
      <Box>
        <TextField
          className={classes.inputItem}
          label="Sale, %"
          value={discountedPrice}
          onChange={handlerSetDiscountPrice}
          error={!!discountedPriceError}
          helperText={discountedPriceError}
          variant="outlined"
        />
        <TextField
          id="date"
          label="Discount time to:"
          type="date"
          variant="outlined"
          defaultValue={discountedDate}
          className={classes.inputItem}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <Box className={classes.submitButton}>
        <Button
          type="button"
          color="primary"
          size="large"
          variant="outlined"
          onClick={handleSendData}
        >
          {key ? 'Update Data' : 'Add'}
        </Button>
      </Box>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductForm;
