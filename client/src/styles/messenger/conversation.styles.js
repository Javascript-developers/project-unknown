import { makeStyles } from '@material-ui/core';
import { blueGrey, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: grey[200],
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  conversationName: {},
}));

export default useStyles;
