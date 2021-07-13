import { makeStyles } from '@material-ui/core';
import { grey, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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
    color: grey[900],
    '&:hover': {
      color: indigo['A700'],
    },
  },
}));

export default useStyles;
