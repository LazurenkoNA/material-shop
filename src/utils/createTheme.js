import { createMuiTheme } from '@material-ui/core';
import { grey, orange } from '@material-ui/core/colors';

const createTheme = () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Nunito, sans-serif',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          a: {
            textDecoration: 'none',
          },
        },
      },
    },
    palette: {
      type: 'dark',
      primary: {
        main: orange[300],
      },
      secondary: {
        main: grey[800],
      },
    },
  });

  return { theme };
};

export default createTheme;
