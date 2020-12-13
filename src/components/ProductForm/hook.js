import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import fire from '../../utils/firebase';
import {
  setProductDescription,
  setProductDescriptionError,
  setProductImage,
  setProductName,
  setProductNameError,
  setProductPrice,
  setProductPriceError,
} from '../../store/actions/productActions';

const useProductForm = () => {
  const dispatch = useDispatch();
  const {
    name,
    nameError,
    description,
    descriptionError,
    price,
    priceError,
    image,
    imageError,
  } = useSelector((state) => state.product);
  const nonDigit = new RegExp(`\\D+`, 'gm');

  // eslint-disable-next-line no-unused-vars
  const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
  }));

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const sendData = (key, value) => {
    fire.database().ref(key).push(value);
  };

  const sendDataImage = (key, value) => {
    fire.storage().ref(`${key}/${image.name}`).put(value);
  };

  const getData = (key) => {
    fire
      .database()
      .ref(key)
      .on('value', (element) => {
        console.log(element.val());
      });
  };

  const handlerSetProductName = (e) => {
    dispatch(setProductName(e.target.value));
    if (name.length <= 60 && nameError) {
      dispatch(setProductNameError(''));
    } else if (name.length > 60 && !nameError) {
      dispatch(setProductNameError('Up to 60 characters'));
    }
  };

  const handlerSetProductDescription = (e) => {
    dispatch(setProductDescription(e.target.value));
    if (description.length <= 200 && descriptionError) {
      dispatch(setProductDescriptionError(''));
    } else if (description.length > 200 && !descriptionError) {
      dispatch(setProductDescriptionError('Up to 200 characters'));
    }
  };

  const handlerSetProductPrice = (e) => {
    const { value } = e.target;
    dispatch(setProductPrice(value));
    if (nonDigit.test(value)) {
      dispatch(setProductPriceError('Only number'));
    } else if (+value > 100000000) {
      dispatch(setProductPriceError('Not more than 100,000,000'));
    } else if (priceError) {
      dispatch(setProductPriceError(''));
    }
  };

  const handleSetImage = (e) => {
    const { files } = e.target;

    if (!files[0]) {
      return;
    }

    dispatch(setProductImage(files[0]));
  };

  const handleSendData = () => {
    if (!name || nameError || !price || priceError || descriptionError || imageError) {
      return;
    }
    const productData = {
      name,
      description,
      price,
      image: image.name,
    };
    sendData('products', productData);
    sendDataImage('products', image);

    dispatch(setProductName(''));
    dispatch(setProductDescription(''));
    dispatch(setProductPrice(''));
    dispatch(setProductImage(null));
    setOpenAlert(true);
  };

  useEffect(() => {
    getData('products');
  });

  return {
    openAlert,
    useStyles,
    handleAlertClose,
    sendData,
    getData,
    handleSendData,
    handlerSetProductName,
    handlerSetProductDescription,
    handlerSetProductPrice,
    handleSetImage,
  };
};

export default useProductForm;
