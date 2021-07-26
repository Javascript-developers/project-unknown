import { makeStyles } from '@material-ui/core';

import { blueGrey, grey, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: theme.spacing(4) },
  tagsContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: blueGrey[900],
    padding: theme.spacing(1, 1, 1, 3),
    marginRight: theme.spacing(2),
    '&:hover': {
      cursor: 'pointer',
      color: indigo['A400'],
      backgroundColor: grey[300],
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default useStyles;
