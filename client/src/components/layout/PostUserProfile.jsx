import React, {useState,  useEffect} from 'react'
import {Grid, Avatar, Typography, Paper} from '@material-ui/core'

import { Image } from 'cloudinary-react';
import { useSelector, useDispatch } from 'react-redux';


import useStyles from '../../styles/layout/post-userProfile.style'
import FollowButton from './FollowButton'

const PostUserProfile = ({currentPostUser, currentUser}) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const [values, setValues] = useState({
        following: null,
        });
        
    useEffect(() => {
    if (currentPostUser !== null && currentUser !== null) {
        console.log('LOL');
        let following = checkFollow(currentPostUser.followers, currentUser._id);
        setValues({
        ...values,
        following,
        });
    }}, [])

    const checkFollow = (user, me) => {
        const match = user.some((follower) => follower._id === me);
        return match;
      };

    const clickFollowButton = (followApi) => {
        dispatch(followApi(currentPostUser.id)).then((data) => {
          setValues({
            ...values,
            following: !values.following,
          });
        });
      };
    



    return (
        <div>
            <Grid  container component={Paper} className={classes.root}>
                <Grid item align="center" xs={12}>
                    <Avatar alt="user avatar" className={classes.avatar}>
                    {currentPostUser.avatar ? (
                        <Image
                          cloudName="dsmrt6yiw"
                          publicId={currentPostUser.avatar}
                          width="100%"
                          // crop="scale"
                        />
                      ) : null}
                    </Avatar>
                    <Typography variant="h5" className={classes.username}>{currentPostUser.name}</Typography>
                </Grid>
                <Grid item align="center" className={classes.userDescriptionContainer}>
                    <Typography variant="subtitle1" className={classes.userDescription}>
                        {currentPostUser.about ? currentPostUser.about : '...'}
                    </Typography>
                </Grid>
                <Grid item align="center" xs={12} className={classes.followButton} >
                    <FollowButton 
                        profile={true}
                        following={values.following}
                        onButtonClick={clickFollowButton}
                    />
                </Grid>
                <Grid item xs={12} className={classes.userInfo}>
                    <Typography></Typography>
                    <Typography></Typography>
                    <Typography></Typography>
                </Grid>
                
            </Grid>
        </div>
    )
}

export default PostUserProfile
