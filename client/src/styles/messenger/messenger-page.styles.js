import { makeStyles } from '@material-ui/core';
import { indigo, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 65px)',
  },

  chatFriends: {},
  chatBox: {},
  chatOnline: {},
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
    position: 'relative',
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
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },

  noConversationText: {
    position: 'absolute',
    marginTop: theme.spacing(10),
    color: blueGrey[100],
    fontSize: '50px',
    textAlign: 'center',
    cursor: 'default',
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
