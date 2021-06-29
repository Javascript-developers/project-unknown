import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // border: '1px solid blue',
    marginTop: '60px',
    // backgroundColor: theme.palette.grey[300],
  },
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5, 6, 6),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '20px',
    marginBottom: '200px',
  },
  publishButton: {
    marginTop: '20px',
  },
}));

export default useStyles;
