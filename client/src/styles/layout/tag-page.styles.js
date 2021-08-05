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
  tagColor: {
    width: '100%',
    height: theme.spacing(2),
    borderRadius: '3px 3px 0 0',
  },
  headerWrapper: {
    padding: theme.spacing(4),
  },
  tagHeader: {
    marginTop: theme.spacing(4),
    // padding: theme.spacing(8),
    border: '1px solid #e2e2e2',
  },
  tagPosts: {
    padding: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(0),
    },
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
