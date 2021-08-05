import { makeStyles } from '@material-ui/core';
import { blueGrey, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(6),
  },
  profileBanner: {
    // backgroundColor: 'blue',
    height: '300px',
    position: 'absolute',
    zIndex: '-1',
    width: '100%',
  },
  userTopDetails: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    border: '1px solid #e2e2e2',
  },
  avatar: {
    height: 80,
    width: 80,
  },
  username: {
    fontWeight: 'bold',
    color: blueGrey[900],
    marginBottom: theme.spacing(2),
  },
  userDescription: {
    fontSize: 22,
    color: blueGrey[900],
    marginBottom: theme.spacing(2),
    fontWeight: 300,
  },
  userDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  userDetailsSocial: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: theme.spacing(2),
  },
  iconContainerWithText: {
    marginRight: theme.spacing(2),
    display: 'flex',
    // alignItems: 'center'
  },
  websiteLink: {
    display: 'flex',
    textDecoration: 'none',
    color: 'red',

    '&:hover': {
      // textDecoration: 'underline',
    },
  },
  icon: {
    color: blueGrey[700],
    fontSize: 30,
    paddingTop: theme.spacing(0.5),
  },
  iconText: {
    color: blueGrey[400],
    paddingTop: theme.spacing(1),
  },
  iconTextWebsite: {
    color: blueGrey[400],
    paddingTop: theme.spacing(1),
    '&:hover': {
      color: blueGrey[700],
      textDecoration: 'underline',
    },
  },
  iconSocialLink: {
    // display: 'flex',
    paddingTop: theme.spacing(0.5),
    cursor: 'pointer',
    color: blueGrey[700],
    fontSize: 30,
    '&:hover': {
      color: blueGrey[900],
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },
  bannerButtons: {
    width: '100%',
    margin: theme.spacing(6, 6, 0, 6),
    // borderRadius: '70p',
  },

  //-------------------- BELLOW USER BANNER ----------------------------------

  postsDetails: {
    border: '1px solid #e2e2e2',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  postsDetailsItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: blueGrey[700],
    marginLeft: theme.spacing(2),
  },
  postsDetailsTypo: {
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
