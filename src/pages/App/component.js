import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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

          {user ? (
            <Switch>
              <Route path="/" exact>
                <Products />
              </Route>
              <Route path="/edit-product">
                <EditProduct />
              </Route>
              <Route path="/add-product">
                <AddProduct />
              </Route>
              <Redirect from="/login" to="/" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Redirect to="/login" />
            </Switch>
          )}
        </Router>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
