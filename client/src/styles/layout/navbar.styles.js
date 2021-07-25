import { makeStyles } from '@material-ui/core';

import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: 'red',
    color: blueGrey[900],
    borderBottom: '1px solid #e2e2e2',
  },
}));

export default useStyles;
