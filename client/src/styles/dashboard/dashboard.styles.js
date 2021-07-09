import { makeStyles } from '@material-ui/core';
import { grey, blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    // border: '1px solid blue',
    width: '100%',
    marginTop: theme.spacing(15),
  },
  tabLabelsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
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
    backgroundColor: grey[50],
  },

  tabPanelContainer: {
    // border: '1px solid red',
    padding: theme.spacing(0, 2),
    width: '100%',
  },
}));

export default useStyles;
