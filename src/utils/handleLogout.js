import fire from './firebase';

const handleLogout = () => {
  fire.auth().signOut();
};

export default handleLogout;
