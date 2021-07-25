import { makeStyles } from '@material-ui/core';

import { grey, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
    border: '1px solid #e2e2e2',
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  tag: {
    paddingRight: theme.spacing(2),
    color: grey[500],
    '&:hover': { color: '#1d2022' },

    // color: '#6d7884',
  },
  tagLink: {
    textDecoration: 'none',
    // color: 'inherit',
    '&:hover': { color: '#1d2022' },
  },
  title: {
    fontWeight: 'bold',
    color: blueGrey[900],
    '&:hover': {
      color: '#323ebe',
    },
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
