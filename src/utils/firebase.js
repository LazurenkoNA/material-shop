// import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCy-1GaQPep4rmqUv5iJig-L7auDT_VLbM',
  authDomain: 'material-shop-716f7.firebaseapp.com',
  projectId: 'material-shop-716f7',
  storageBucket: 'material-shop-716f7.appspot.com',
  messagingSenderId: '259561212806',
  appId: '1:259561212806:web:8f66274923891ec7043a07',
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
