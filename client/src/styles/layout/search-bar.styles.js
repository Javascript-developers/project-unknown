import { makeStyles } from '@material-ui/core';

import { blueGrey, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    color: grey[700],
    backgroundColor: grey[100],
    marginLeft: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: grey[200],
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },

  iconWrapper: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputBase: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(0.7, 0.7, 0.7, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  },
}));

export default useStyles;
