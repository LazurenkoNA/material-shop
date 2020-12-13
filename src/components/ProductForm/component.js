import React from 'react';
import { Box, Button, Snackbar, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useProductForm from './hook';
import Alert from '../Alert';

const ProductForm = () => {
  const { name, nameError, description, descriptionError, price, priceError, image } = useSelector(
    (state) => state.product
  );
  const {
    openAlert,
    handleAlertClose,
    useStyles,
    handleSendData,
    handlerSetProductName,
    handlerSetProductDescription,
    handlerSetProductPrice,
    handleSetImage,
  } = useProductForm();
  const classes = useStyles();

  return (
    <div>
      <Box>
        <TextField
          required
          value={name}
          autoFocus
          multiline
          onChange={handlerSetProductName}
          label="Name"
          error={!!nameError}
          helperText={nameError}
          variant="outlined"
        />
        <TextField
          value={description}
          autoFocus
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
          autoFocus
          onInput={handlerSetProductPrice}
          label="Price"
          error={!!priceError}
          helperText={priceError}
          variant="outlined"
        />
      </Box>
      <Box>
        <label htmlFor="button-file" onChange={handleSetImage}>
          <input accept="image/*" className={classes.input} id="button-file" multiple type="file" />
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <Typography component="h6" variant="h6">
          {image ? image.name : 'Load File'}
        </Typography>
      </Box>
      <Box>
        <Button type="button" color="primary" variant="outlined" onClick={handleSendData}>
          Add
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
