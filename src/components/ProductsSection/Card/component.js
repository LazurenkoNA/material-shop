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
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import fire from '../../../utils/firebase';
import { setProductKey } from '../../../store/actions/productActions';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    width: 250,
  },
  media: {
    height: 140,
  },
});
// eslint-disable-next-line react/prop-types
const CardItem = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');

  const { name, description, image: imageName, price } = useSelector((state) => state.products[id]);

  const getImage = async () => {
    const storage = fire.storage();
    const pathReference = await storage.ref().child(`products/${imageName}`).getDownloadURL();
    setImage(pathReference);
  };

  useEffect(() => {
    getImage();
  }, []);

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
                $ {price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link to="/edit-product">
              <Button size="small" color="primary" onClick={handleKey}>
                Edit
              </Button>
            </Link>
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
