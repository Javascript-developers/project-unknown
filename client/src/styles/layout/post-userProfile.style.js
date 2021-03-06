import { makeStyles } from '@material-ui/core';

import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 3, 3),
    border: '1px solid #e2e2e2',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  name: {
    marginTop: theme.spacing(1),
  },
  nameLink: {
    textDecoration: 'none',
    // color: '#1d2022',
    color: blueGrey[900],
  },
  username: {
    color: blueGrey[400],
  },
  followButton: {
    marginTop: theme.spacing(3),
  },
  userDescriptionContainer: {
    paddingTop: theme.spacing(1),
  },
  userDescription: {
    color: '#888888',
  },
  userInfo: {},
}));

export default useStyles;
