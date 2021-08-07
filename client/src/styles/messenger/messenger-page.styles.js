import { makeStyles } from '@material-ui/core';
import { indigo, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 65px)',
  },

  chatFriends: {
    border: '1px solid blue',
  },
  chatBox: {
    border: '1px solid blue',
  },
  chatOnline: {
    border: '1px solid blue',
  },
  //------------------------
  chatFriendsWrapper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  chatBoxWrapper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  chatOnlineWrapper: {
    padding: theme.spacing(2),
  },

  chatBoxTop: {
    width: '100%',

    //calculating vh - (textarea + navbar)
    height: 'calc(100vh - 180px)',
    overflowY: 'scroll',
  },
  chatBoxBottom: {
    border: '1px solid red',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  //---------------------------
  inputBase: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      //   padding: theme.spacing(0.7, 0.7, 0.7, 0),
      padding: theme.spacing(1),
      border: `1px solid ${blueGrey[600]}`,
      borderRadius: theme.shape.borderRadius,
    },
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
