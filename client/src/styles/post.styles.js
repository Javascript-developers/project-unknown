import { makeStyles } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
  postGrid: {
    marginRight: theme.spacing(5),
    border: '1px solid #e2e2e2',
  },
  afterBannerContainer: {
    padding: theme.spacing(6, 8, 6),
  },
  bannerBoxStyle: {
    // backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5), url(https://source.unsplash.com/random)`,
    // color: '#fff',
    overflow: 'hidden',
    height: '300px',
    // backgroundPosition: 'center',
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    // position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3px 3px 0 0',
    flexDirection: 'column',
    zIndex: '1',
  },
  title: {
    fontWeight: 'bold',
    color: blueGrey[900],
  },
  color1: {
    backgroundColor: 'green',
    color: 'white',
    marginRight: theme.spacing(1),
  },
  color2: {
    backgroundColor: 'yellow',
    color: 'black',
    marginRight: theme.spacing(1),
  },
  color3: {
    backgroundColor: 'red',
    color: 'white',
    marginRight: theme.spacing(1),
    hover: { color: 'black' },
  },

  //-------------------------------------------------------

  userPost: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(3),
  },
  avatarPost: {
    width: 24,
    height: 24,
    margin: theme.spacing(1, 2, 1, 0),
  },
  userPostName: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
    color: blueGrey[900],
  },
  userPostNameLink: {
    textDecoration: 'none',
    color: '#1d2022',
  },
  userPostDate: {
    color: 'grey',
  },

  //-------------------------------------------------------

  postBodyContainer: {
    margin: theme.spacing(3, 0, 5, 0),
    color: blueGrey[900],
  },
  postBodyTypo: {},

  //-------------------------------------------------------

  commentSection: {
    paddingTop: theme.spacing(3),
  },
  addCommentContainer: {
    marginTop: theme.spacing(3),
  },
  avatarAddComment: {
    width: 24,
    height: 24,
  },
  commentTextArea: {
    fontFamily: 'inherit',
    padding: '0.25em 0.5em',
    borderColor: '#ccc',
    // backgroundColor: '#fff',
    lineHeight: '1',
    // backgroundColor: '#eee',
    borderRadius: '5px',
    width: '100%',
    resize: 'none',
    // height: '50%',
    // transition: '180ms height ease',
    padding: theme.spacing(2),

    '&:focus': {
      // height: '120%',
      outline: 'none',
      border: '2px solid lightblue',
    },

    comments: {
      // marginTop: theme.spacing(7),
    },

    //-------------------------------------------------------

    postInfoContainer: {
      // marginLeft: theme.spacing(1),
      padding: theme.spacing(3, 3, 3, 3),
    },
  },
}));

export default useStyles;
