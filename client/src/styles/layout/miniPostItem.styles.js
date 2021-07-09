import { makeStyles } from '@material-ui/core';

import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
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
