// import { createMuiTheme } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
// import green from '@material-ui/core/colors/green';
// import purple from '@material-ui/core/colors/purple';
import { green, purple, grey } from '@material-ui/core/colors';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: grey[800] },
  },
});
