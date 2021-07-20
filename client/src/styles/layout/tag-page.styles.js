import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

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
    border: '1px solid #e2e2e2',
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
    color: blueGrey[900],
  },
  hash: {
    color: blueGrey[400],
  },
}));

export default useStyles;
