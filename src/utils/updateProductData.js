import fire from './firebase';

const updateProductData = (key, newData) => {
  fire.database().ref(`products/${key}`).set(newData);
};

export default updateProductData;
