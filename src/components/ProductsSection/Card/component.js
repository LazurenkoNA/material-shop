import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import fire from '../../../utils/firebase';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
// eslint-disable-next-line react/prop-types
const CardItem = ({ id }) => {
  const classes = useStyles();
  const [image, setImage] = useState('');

  const { name, description, image: imageName } = useSelector((state) => state.products[id]);

  const getImage = async () => {
    const storage = fire.storage();
    const pathReference = await storage.ref().child(`products/${imageName}`).getDownloadURL();
    setImage(pathReference);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button size="small" color="primary"> */}
          {/*  Share */}
          {/* </Button> */}
          {/* <Button size="small" color="primary"> */}
          {/*  Learn More */}
          {/* </Button> */}
        </CardActions>
      </Card>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string,
};

export default CardItem;
