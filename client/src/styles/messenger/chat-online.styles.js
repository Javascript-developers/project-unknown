import { makeStyles } from '@material-ui/core';
import { blueGrey, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  chatOnline: {},
  chatOnlineFriend: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: grey[200],
    },
  },

  avatarBadge: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    height: 32,
    width: 32,
  },
  friendName: {},
}));

export default useStyles;
