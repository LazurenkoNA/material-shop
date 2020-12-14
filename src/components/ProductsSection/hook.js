import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import fire from '../../utils/firebase';
import setProducts from '../../store/actions/productsActions';

const useProductsSection = () => {
  const dispatch = useDispatch();
  const getData = (key) => {
    const data = fire
      .database()
      .ref(key)
      .on('value', (element) => {
        dispatch(setProducts(element.val()));
        return element.val();
      });
    return data;
  };

  const classes = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(2),
    },
  }))();

  useEffect(() => {
    getData('products');
  }, []);

  return { classes, getData };
};

export default useProductsSection;
