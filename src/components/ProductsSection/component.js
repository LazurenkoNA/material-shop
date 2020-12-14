import React from 'react';
import { Grid } from '@material-ui/core';
import useProductsSection from './hook';
import Card from './Card';

const ProductsSection = () => {
  const { classes, products } = useProductsSection();

  return (
    <div style={{ paddingLeft: 15, paddingRight: 15 }}>
      {products && (
        <Grid container className={classes.root} justify="center" spacing={3}>
          {Object.keys(products).map((key) => (
            <Grid key={key} item>
              <Card id={key} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProductsSection;
