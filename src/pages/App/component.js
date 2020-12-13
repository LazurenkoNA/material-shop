import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useApp from './hook';
import Login from '../login';
import Products from '../products';
import EditProduct from '../editProduct';
import AddProduct from '../addProduct';

const App = () => {
  const { theme } = useApp();
  const { user } = useSelector((state) => state.login);

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Switch>
            <Route path="/">{user ? <Products /> : <Login />}</Route>
            <Route path="/edit-product">
              <EditProduct />
            </Route>
            <Route path="/add-product">
              <AddProduct />
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
