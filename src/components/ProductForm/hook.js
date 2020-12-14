import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import fire from '../../utils/firebase';
import {
  setProductDescription,
  setProductDescriptionError,
  setProductDiscountData,
  setProductDiscountPrice,
  setProductDiscountPriceError,
  setProductImage,
  setProductKey,
  setProductName,
  setProductNameError,
  setProductPrice,
  setProductPriceError,
} from '../../store/actions/productActions';
import setProducts from '../../store/actions/productsActions';

const useProductForm = () => {
  const dispatch = useDispatch();
  const {
    key: productKey,
    name,
    nameError,
    description,
    descriptionError,
    price,
    priceError,
    image,
    imageError,
    discountedPrice,
    discountedPriceError,
    discountedDate,
  } = useSelector((state) => state.product);
  const { products } = useSelector((state) => state);
  const nonDigit = new RegExp(`\\D+`, 'gm');

  const useStyles = makeStyles((theme) => ({
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
    input: {
      display: 'none',
    },
    inputItem: {
      margin: theme.spacing(1),
    },
    file: {
      display: 'flex',
      margin: theme.spacing(1),
    },
    fileButton: {
      marginRight: theme.spacing(1),
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
    inputDate: {
      width: 200,
    },
  }));

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const sendData = (key, value) => {
    fire.database().ref(key).push(`${value}`);
  };

  const sendDataImage = (key, value) => {
    fire.storage().ref(`${key}/${image.name}`).put(value);
  };

  const getData = () => {
    const {
      name: nameProduct,
      description: descriptionProduct,
      image: imageProduct,
      price: priceProduct,
    } = products[productKey];

    dispatch(setProductName(nameProduct));
    dispatch(setProductDescription(descriptionProduct));
    dispatch(setProductPrice(priceProduct));
    dispatch(setProductImage(imageProduct));
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

  const handlerSetDiscountPrice = (e) => {
    const { value } = e.target;
    dispatch(setProductDiscountPrice(value));
    if (nonDigit.test(value)) {
      dispatch(setProductDiscountPriceError('Only number'));
    } else if (+value > 100) {
      dispatch(setProductDiscountPriceError('More 100% ?'));
    } else if (discountedPriceError) {
      dispatch(setProductDiscountPriceError(''));
    }
  };

  const handleSetImage = (e) => {
    const { files } = e.target;
    if (!files[0]) {
      return;
    }
    dispatch(setProductImage(files[0]));
  };

  const deleteData = (key, value) => {
    fire.database().ref(key).child(value).remove();
  };

  const getProductsData = (key) =>
    fire
      .database()
      .ref(key)
      .on('value', (element) => {
        dispatch(setProducts(element.val()));
      });

  const handleSendData = () => {
    if (!name || nameError || !price || priceError || descriptionError || imageError) {
      return;
    }
    const imageName = image.name;
    let productData;

    if (productKey && !imageName) {
      productData = {
        name,
        description,
        price,
        image,
        discountedPrice,
        discountedDate,
      };
    } else {
      productData = {
        name,
        description,
        price,
        image: imageName,
        discountedPrice,
        discountedDate,
      };
    }

    if (productKey) {
      deleteData('products', productKey);
      sendData('products', productData);
      if (imageName) {
        sendDataImage('products', `${image}`);
      }
    } else {
      sendData('products', productData);
      sendDataImage('products', `${image}`);
    }

    getProductsData('products');

    dispatch(setProductKey(''));
    dispatch(setProductName(''));
    dispatch(setProductDescription(''));
    dispatch(setProductPrice(''));
    dispatch(setProductImage(null));
    dispatch(setProductDiscountData(''));
    dispatch(setProductDiscountPrice(''));
    setOpenAlert(true);
  };

  useEffect(() => {
    if (productKey) {
      getData('products');
    }
  }, []);

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
    handlerSetDiscountPrice,
    handleSetImage,
  };
};

export default useProductForm;
