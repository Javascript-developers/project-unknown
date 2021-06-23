import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 3, 3),
    },
    avatar: {
        width: 100,
        height: 100,
    },
    username: {
        marginTop: theme.spacing(1)
    },
    followButton: {
        marginTop: theme.spacing(3)
    },
    userDescriptionContainer: {
        paddingTop: theme.spacing(1)
    },
    userDescription: {
        color: '#888888',
        
    },
    userInfo: {}
}))

export default useStyles;