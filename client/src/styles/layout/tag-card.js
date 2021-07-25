import { makeStyles } from '@material-ui/core';
import { grey, indigo, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    border: '1px solid #e2e2e2',
  },
  colorContainer: {},
  tagTitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  titleLink: {
    textDecoration: 'none',
  },
  tag: {
    fontWeight: 'bold',
    color: blueGrey[900],
    '&:hover': {
      color: indigo['A700'],
    },
  },
  hash: {
    color: blueGrey[300],
  },
}));

export default useStyles;
