import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

  useEffect(() => {
    getData('products');
  }, []);

  return {
    getData,
  };
};

export default useProductsSection;
