import { makeStyles } from '@material-ui/core';

import { blueGrey, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  navBar: {
    backgroundColor: theme.palette.background.paper,
    color: blueGrey[900],
    borderBottom: '1px solid #e2e2e2',
  },
}));

export default useStyles;
