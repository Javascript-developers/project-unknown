import { makeStyles } from '@material-ui/core';

import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  avatar: {
    height: 24,
    width: 24,
  },
  commentContainer: {
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: theme.spacing(1),
    color: blueGrey[900],
  },

  comments: {
    // marginTop: theme.spacing(4),
  },
  commentTitle: {
    // display: 'flex',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  comment: {
    paddingTop: theme.spacing(1),
  },
  commentUsername: {
    fontWeight: 'bold',
    color: '#8b8989',
  },
  commentUsernameLink: {
    textDecoration: 'none',
    color: '#8b8989',
    '&:hover': {
      color: '#606971',
    },
  },
  date: {
    fontWeight: 'normal',
    fontSize: '0.8rem',
  },
}));

export default useStyles;
