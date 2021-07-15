import { makeStyles } from '@material-ui/core';
import { blueGrey, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: blueGrey[700],
  },
  bg: {
    backgroundColor: blueGrey[100],
    padding: theme.spacing(8),
    marginTop: theme.spacing(15),
  },
  icon: {
    color: blueGrey[700],
    fontSize: 30,
  },
  iconSocialLink: {
    cursor: 'pointer',
    color: blueGrey[700],
    fontSize: 30,
    '&:hover': {
      color: blueGrey[900],
    },
  },
}));

export default useStyles;
