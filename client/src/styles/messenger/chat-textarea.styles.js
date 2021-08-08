import { makeStyles } from '@material-ui/core';
import { blueGrey, grey, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  textarea: {
    width: '80%',
    padding: theme.spacing(2),
    border: `1px solid ${blueGrey[800]}`,
    borderRadius: theme.shape.borderRadius,
  },
  chatSubmitButton: {},
}));

export default useStyles;
