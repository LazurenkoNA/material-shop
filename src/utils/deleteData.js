import fire from './firebase';

const deleteData = (key, value) => {
  fire.database().ref(key).child(value).remove();
};

export default deleteData;
