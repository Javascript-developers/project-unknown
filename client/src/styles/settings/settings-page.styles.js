import { makeStyles } from '@material-ui/core';
import { indigo, blue, grey, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
  },
  titlePage: {
    display: 'flex',
  },
  settingsTitle: {
    color: blueGrey[900],
  },

  spanUserTitle: {
    color: indigo['A400'],
    fontWeight: 'bold',
  },

  tabsContainer: {
    width: '100%',
    marginTop: theme.spacing(5),
  },

  tabLabel: {
    padding: theme.spacing(2),
    borderRadius: '5px',
    color: blueGrey[900],
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: grey[300],
      color: blue[700],
    },
  },

  tabLabelsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      marginBottom: theme.spacing(2),
    },
  },

  tabPanelContainer: {
    padding: theme.spacing(0, 2),
    width: '100%',
  },

  tabLabelActive: {
    padding: theme.spacing(2),
    borderRadius: '5px',
    '&:hover': {
      cursor: 'pointer',
      // backgroundColor: grey[300],
      color: blue[700],
    },
    // backgroundColor: grey[50],
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #e2e2e2',
  },

  activeTabText: {
    fontWeight: 'bold',
    color: blueGrey[900],
  },
}));

export default useStyles;
