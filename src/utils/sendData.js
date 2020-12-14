import fire from './firebase';

const sendData = (key, value) => {
  fire.database().ref(key).push(value);
};

export default sendData;
