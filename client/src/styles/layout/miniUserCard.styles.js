import { makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    border: '1px solid #e2e2e2',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(1),
  },
  titleLink: {
    textDecoration: 'none',
    color: grey[900],
    '&:hover': {
      color: '#323ebe',
    },
  },
}));

export default useStyles;
