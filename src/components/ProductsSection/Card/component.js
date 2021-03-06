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
// import setProducts from '../../../store/actions/productsActions';
// import deleteData from '../../../utils/deleteData';
import useCardItem from './hook';

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
  discountPrice: {
    fontWeight: 'bold',
  },
});
// eslint-disable-next-line react/prop-types
const CardItem = ({ id, handleClickOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const { setDiscountDate } = useCardItem();
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

  // Get image
  useEffect(() => {
    if (imageName) {
      getImage(imageName).then();
    }
  }, [products]);

  const setDiscountPrice = () =>
    `$${price} (sale ${discountedPrice}%) => to $${Math.floor(
      ((100 - +discountedPrice) / 100) * price
    )}`;

  const handleKey = () => {
    dispatch(setProductKey(id));
  };

  return (
    <div>
      {image && (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia className={classes.media} image={image} title={name} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
              <Typography
                className={classes.discountPrice}
                variant="body1"
                color="textSecondary"
                component="p"
              >
                {discountedPrice ? setDiscountPrice() : `$${price}`}
              </Typography>
              {discountedDate && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {setDiscountDate(discountedDate)}
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
              <Button size="small" color="primary" onClick={() => handleClickOpen(id)}>
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
