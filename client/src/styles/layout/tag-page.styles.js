import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  tagBanner: {
    width: '100%',
    height: '150px',
    position: 'absolute',
    backgroundColor: 'gray',
    zIndex: '-1',
  },
  tagHeader: {
    marginTop: '75px',
    padding: theme.spacing(8),
  },
  tagPosts: {
    padding: theme.spacing(8),
  },
  headerItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tagName: {
    fontWeight: 'bold',
  },
}));

export default useStyles;
