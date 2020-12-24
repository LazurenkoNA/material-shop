import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import fire from '../../utils/firebase';
import {
  setProductDiscountPrice,
  setProductDiscountPriceError,
  setProductImage,
  setProductImageError,
  setProductKey,
} from '../../store/actions/productActions';
import setProducts from '../../store/actions/productsActions';
import sendData from '../../utils/sendData';
import sendDataImage from '../../utils/sendDataImage';
import updateProductData from '../../utils/updateProductData';

const useProductForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { key: productKey, imageError, image, discountedPriceError } = useSelector(
    (state) => state.product
  );
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
      '& input[type="number"]::-webkit-outer-spin-button, & input[type="number"]::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
      },
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
    imageError: {
      color: 'red',
    },
  }));
  const optionsSelect = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];

  const [openAlert, setOpenAlert] = useState(false);

  const getProductsData = (key) =>
    fire
      .database()
      .ref(key)
      .on('value', (element) => {
        dispatch(setProducts(element.val()));
      });

  const setAllDefaultValue = (formikItem) => {
    dispatch(setProductKey(''));
    formikItem.setFieldValue('name', '', false);
    formikItem.setFieldValue('description', '', false);
    formikItem.setFieldValue('price', '', false);
    dispatch(setProductImage(null));
    formikItem.setFieldValue('discountedPrice', '', false);
    formikItem.setFieldValue('discountedDate', '', false);
  };

  const validationSchema = yup.object({
    name: yup
      .string('Enter product name')
      .required('Product name is required')
      .min(20, 'Product name should be of minimum 20 characters')
      .max(60, 'Product name should be of maximum 60 characters'),
    description: yup
      .string('Enter description')
      .max(200, 'Description should be of maximum 200 characters'),
    price: yup
      .number('Enter price')
      .required('Price is required')
      .min(0, 'Price should be more 0')
      .max(99999999.99, 'Price should be less 100 000 000'),
    discountedPrice: yup.number(),
    discountedDate: yup
      .date('Enter date')
      .when('discountedPrice', (discountedPrice, schema) =>
        discountedPrice ? schema.required('Discount date is required') : schema
      )
      .min(new Date(), 'Discount date should not be in the past'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      discountedPrice: '',
      discountedDate: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (imageError) {
        return;
      }

      if (!image) {
        dispatch(setProductImageError('Image is required'));
        return;
      }

      // ~ If Edit product
      if (productKey) {
        // ~ If update image
        if (image.name) {
          const productData = {
            ...values,
            image: image.name,
          };
          updateProductData(productKey, productData);
          sendDataImage('products', image);
          history.push('/');
        } else {
          // ~ If did not update image
          const productData = {
            ...values,
            image,
          };
          updateProductData(productKey, productData);
          history.push('/');
        }
      } else {
        // ~ Add product
        const productData = {
          ...values,
          image: image.name,
        };
        sendData('products', productData);
        sendDataImage('products', image);
      }

      getProductsData('products');

      setAllDefaultValue(formik);
      setOpenAlert(true);
    },
  });

  const handleLoad = ({ target: { result } }) => {
    const imageItem = new Image();
    imageItem.src = result;
    imageItem.onload = () => {
      // validate size
      if (
        imageItem.height <= 200 ||
        imageItem.height >= 4000 ||
        imageItem.width <= 200 ||
        imageItem.width >= 4000
      ) {
        dispatch(setProductImageError('Image should be from 200x200 to 4000x4000 px'));
      } else if (imageError) {
        dispatch(setProductImageError(''));
      }
    };
  };
  // handler for input onChange
  const handleLoadImage = ({ target: { files } }) => {
    dispatch(setProductImage(files[0]));
    const fr = new FileReader();
    fr.readAsDataURL(files[0]);
    fr.onload = handleLoad;
  };

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

    formik.setFieldValue('name', nameProduct, false);
    formik.setFieldValue('description', descriptionProduct, false);
    formik.setFieldValue('price', priceProduct, false);
    dispatch(setProductImage(imageProduct));
    formik.setFieldValue('discountedPrice', discountedPriceProduct, false);
    formik.setFieldValue('discountedDate', discountedDateProduct, false);
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
  const handleSendData = () => {
    getProductsData('products');

    setAllDefaultValue(formik);
    setOpenAlert(true);
  };

  useEffect(() => {
    if (productKey) {
      getData('products');
    } else {
      setAllDefaultValue(formik);
    }
  }, []);

  return {
    openAlert,
    useStyles,
    handleAlertClose,
    sendData,
    getData,
    handleSendData,
    handlerSetDiscountPrice,
    handleLoadImage,
    formik,
    optionsSelect,
  };
};

export default useProductForm;
