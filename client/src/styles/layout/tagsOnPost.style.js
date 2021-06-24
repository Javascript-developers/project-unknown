import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingRight: theme.spacing(1),
    display: 'inline',
  },
  tag: {
    // backgroundColor: '#2980b9',
    color: 'white',
    textDecoration: 'none',
    padding: '0.3rem',
    fontSize: '0.9rem',
    borderRadius: '6px',
  },
}));

export default useStyles;
