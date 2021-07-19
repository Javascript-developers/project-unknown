import { makeStyles } from '@material-ui/core';
import { indigo, blue, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
  },
  titlePage: {
    display: 'flex',
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
  },
}));

export default useStyles;
