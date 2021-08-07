import { makeStyles } from '@material-ui/core';
import { blueGrey, grey, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: (props) => (props.own ? 'flex-end' : 'flex-start'),
  },
  messageTop: {
    display: 'flex',
  },
  messageBottom: {},

  avatar: {
    height: 30,
    width: 30,
    marginRight: theme.spacing(2),
  },
  text: {
    padding: theme.spacing(2),
    backgroundColor: (props) => (props.own ? grey[300] : indigo['A400']),
    borderRadius: (props) =>
      props.own ? theme.spacing(2, 0.5, 2, 2) : theme.spacing(0.5, 2, 2, 2),
    color: (props) => (props.own ? blueGrey[900] : grey[50]),
    maxWidth: theme.spacing(60),
  },
}));

export default useStyles;
