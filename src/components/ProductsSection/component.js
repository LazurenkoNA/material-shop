import React from 'react';
import { useSelector } from 'react-redux';
import useProductsSection from './hook';
import Card from './Card';
// import Card from './Card';

const ProductsSection = () => {
  useProductsSection();

  const { products } = useSelector((state) => state);

  console.log(products);

  return <div>{products && Object.keys(products).map((key) => <Card key={key} id={key} />)}</div>;
};

export default ProductsSection;
