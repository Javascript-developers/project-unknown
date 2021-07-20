import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    border: '1px solid #e2e2e2',
    padding: theme.spacing(2),
  },
  avatarContainer: {
    marginRight: theme.spacing(1),
  },
  username: {
    fontWeight: 'bold',
    color: '#606971',
    '&:hover': {
      color: blueGrey[900],
    },
  },
  usernameLink: {
    textDecoration: 'none',
  },
  date: {
    color: '#9aa2aa',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  title: {
    fontWeight: 'bold',
    color: blueGrey[900],
    '&:hover': {
      color: '#323ebe',
    },
  },
  titleContainer: {
    marginTop: theme.spacing(1),
  },
  tag: {
    color: '#6d7884',
    display: 'flex',
  },
  tagLink: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: theme.spacing(1),
    '&:hover': { color: blueGrey[900] },
  },
  taghash: { color: '#9aa2aa' },
  socialContainer: {
    marginTop: theme.spacing(2),
  },

  socialItem: {
    display: 'flex',
    color: '#61666c',
    '&:hover': { color: blueGrey[900] },
    // flexDirection: 'column',
    // justifyContent: 'center',
    fontWeight: 300,
  },
}));

export default useStyles;
