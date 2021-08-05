import { makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  textarea: {
    fontFamily: 'inherit',
    padding: '0.25em 0.5em',
    // borderColor: '#ccc',
    // backgroundColor: '#fff',
    lineHeight: '1',
    // backgroundColor: '#eee',
    borderRadius: '5px',
    width: '100%',
    resize: 'none',
    // height: '50%',
    // transition: '180ms height ease',
    padding: theme.spacing(2),
    outline: 'none',
    border: `2px solid ${indigo['A400']}`,
    marginTop: theme.spacing(2),

    // '&:focus': {
    //   // height: '120%',
    //   outline: 'none',
    //   border: '2px solid lightblue',
    // },
  },
}));

export default useStyles;
