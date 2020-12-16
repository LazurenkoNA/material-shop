import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import fire from '../../utils/firebase';
import {
  setProductDescription,
  setProductDescriptionError,
  setProductDiscountDate,
  setProductDiscountDateError,
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
import sendData from '../../utils/sendData';
import sendDataImage from '../../utils/sendDataImage';
import updateProductData from '../../utils/updateProductData';

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
    discountedDateError,
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
    fab: {
      position: 'fixed',
      top: theme.spacing(3),
      left: theme.spacing(3),
    },
  }));

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const getData = () => {
    const {
      name: nameProduct,
      description: descriptionProduct,
      image: imageProduct,
      price: priceProduct,
      discountedDate: discountedDateProduct,
      discountedPrice: discountedPriceProduct,
    } = products[productKey];

    dispatch(setProductName(nameProduct));
    dispatch(setProductDescription(descriptionProduct));
    dispatch(setProductPrice(priceProduct));
    dispatch(setProductImage(imageProduct));
    dispatch(setProductDiscountDate(discountedDateProduct));
    dispatch(setProductDiscountPrice(discountedPriceProduct));
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
    } else if (+value > 90) {
      dispatch(setProductDiscountPriceError('Not more 90%'));
    } else if (discountedPriceError) {
      dispatch(setProductDiscountPriceError(''));
    }
  };

  const handleSetProductDate = (e) => {
    const { value } = e.target;
    dispatch(setProductDiscountDate(value));
    if (discountedDateError) dispatch(setProductDiscountDateError(''));
  };

  const handleSetImage = (e) => {
    const { files } = e.target;
    if (!files[0]) {
      return;
    }
    dispatch(setProductImage(files[0]));
  };

  const getProductsData = (key) =>
    fire
      .database()
      .ref(key)
      .on('value', (element) => {
        dispatch(setProducts(element.val()));
      });

  const setAllDefaultValue = () => {
    dispatch(setProductKey(''));
    dispatch(setProductName(''));
    dispatch(setProductDescription(''));
    dispatch(setProductPrice(''));
    dispatch(setProductImage(null));
    dispatch(setProductDiscountDate(''));
    dispatch(setProductDiscountPrice(''));
  };

  const handleSendData = () => {
    if (
      !name ||
      nameError ||
      !price ||
      priceError ||
      descriptionError ||
      imageError ||
      discountedDateError ||
      discountedPriceError
    ) {
      return;
    }

    // ~ Validation discount date empty
    if (discountedPrice && !discountedDate) {
      dispatch(
        setProductDiscountDateError('Discount date not be empty when the discount price id filled')
      );
      return;
    }

    // ~ Validation discount price empty
    if (!discountedPrice && discountedDate) {
      dispatch(
        setProductDiscountPriceError('The discount price cannot be empty when the date is filled')
      );
      return;
    }

    // ~ Validation discount price < 10%
    if (discountedPrice && +discountedPrice < 10) {
      dispatch(setProductDiscountPriceError('Not less 10%'));
      return;
    }

    // ~ Validation length product name < 20
    if (name.length < 20) {
      dispatch(setProductNameError('Minimal length product name 20 symbols'));
      return;
    }

    // ~ Past discount time
    if (discountedDate) {
      if (new Date(discountedDate) - Date.now() <= 0) {
        dispatch(setProductDiscountDateError('This past time'));
        return;
      }
    }

    const imageName = image.name;

    // ~ If edit product
    if (productKey) {
      // ~ If update image
      if (imageName) {
        const productData = {
          name,
          description,
          price,
          image: imageName,
          discountedPrice,
          discountedDate,
        };
        updateProductData(productKey, productData);
        sendDataImage('products', image);
        window.location.pathname = '/';
      } else {
        // ~ If did not update image
        const productData = {
          name,
          description,
          price,
          image,
          discountedPrice,
          discountedDate,
        };
        updateProductData(productKey, productData);
        window.location.pathname = '/';
      }
    } else {
      // ~ Add product
      const productData = {
        name,
        description,
        price,
        image: image.name,
        discountedPrice,
        discountedDate,
      };
      sendData('products', productData);
      sendDataImage('products', image);
    }

    getProductsData('products');

    setAllDefaultValue();
    setOpenAlert(true);
  };

  useEffect(() => {
    if (productKey) {
      getData('products');
    } else {
      setAllDefaultValue();
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
    handleSetProductDate,
  };
};

export default useProductForm;
