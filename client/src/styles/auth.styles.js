import { makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: indigo[500],

    '&:visited': {
      color: indigo[500],
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default useStyles;
