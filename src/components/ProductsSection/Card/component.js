import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import fire from '../../../utils/firebase';
import { setProductKey } from '../../../store/actions/productActions';
import setProducts from '../../../store/actions/productsActions';
import deleteData from '../../../utils/deleteData';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 250,
  },
  media: {
    height: 140,
  },
  cardButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
// eslint-disable-next-line react/prop-types
const CardItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');

  const {
    name,
    description,
    image: imageName,
    price,
    discountedPrice,
    discountedDate,
  } = useSelector((state) => state.products[id]);
  const { products } = useSelector((state) => state);

  const getImage = async (imagePath) => {
    const storage = fire.storage();
    const pathReference = await storage.ref().child(`products/${imagePath}`).getDownloadURL();
    setImage(pathReference);

    return pathReference;
  };

  const handleDeleteCard = () => {
    // Delete in bd
    deleteData('products', id);
    // Delete in state
    const newProducts = { ...products };

    delete newProducts[id];
    dispatch(setProducts({ ...newProducts }));
  };

  // Get image
  useEffect(() => {
    if (imageName) {
      getImage(imageName).then();
    }
  }, [products]);

  const setDiscountDate = () => {
    if (discountedDate) {
      const nowDate = Date.now();
      const endSale = new Date(discountedDate);
      let result;

      const timeToEndSale = new Date(endSale - nowDate);

      // ~ If date <= 0
      if (timeToEndSale <= 0) {
        result = 'Sale end 😔';
        return result;
      }

      // Counting days
      let seconds = Math.floor(timeToEndSale / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      // Counting rest data
      hours %= 24;
      seconds %= 60;
      minutes %= 60;

      const templateDays = days ? `${days}days` : '';

      // result = `End sale across ${templateDays} ${hours}:${minutes}:${seconds}`;

      result = `End sale across ${templateDays}`;

      return result;
    }
    return '';
  };

  const handleKey = () => {
    dispatch(setProductKey(id));
  };

  return (
    <div>
      {image && (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} image={image} title="Contemplative Reptile" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {discountedPrice
                  ? `(sale ${discountedPrice}%) $${price} => to $${
                      ((100 - +discountedPrice) / 100) * price
                    }`
                  : `$${price}`}
              </Typography>
              {discountedDate && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {setDiscountDate()}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box className={classes.cardButtons}>
              <Link to="/edit-product">
                <Button size="small" color="primary" onClick={handleKey}>
                  Edit
                </Button>
              </Link>
              <Button size="small" color="primary" onClick={handleDeleteCard}>
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string,
};

export default CardItem;
