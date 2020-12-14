import fire from './firebase';

const sendDataImage = (key, value) => {
  fire.storage().ref(`${key}/${value.name}`).put(value);
};

export default sendDataImage;
