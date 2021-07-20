import { makeStyles } from '@material-ui/core';
import { deepOrange, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  profileCategoryContainer: {
    padding: theme.spacing(4),
    border: '1px solid #e2e2e2',
    marginBottom: theme.spacing(3),
  },
  panelTitle: {
    fontWeight: 'bold',
    color: blueGrey[900],
  },
  avatar: {
    height: 80,
    width: 80,
    backgroundColor: deepOrange[500],
    marginRight: theme.spacing(3),
  },
  uploadAvatar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: theme.spacing(3),
  },
  showEmail: {
    marginTop: theme.spacing(3),
  },
  showEmailText: {
    color: blueGrey[700],
  },
}));

export default useStyles;
