import { makeStyles } from '@material-ui/core';
import { grey, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    // border: '1px solid blue',
    width: '100%',
    marginTop: theme.spacing(10),
  },
  topTitle: {
    marginTop: theme.spacing(3),
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
  tabLabel: {
    padding: theme.spacing(2),
    borderRadius: '5px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: grey[300],
      color: blue[700],
    },
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

  tabPanelContainer: {
    // border: '1px solid red',
    padding: theme.spacing(0, 2),
    width: '100%',
  },
}));

export default useStyles;
