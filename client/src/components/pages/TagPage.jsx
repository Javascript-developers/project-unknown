import React, { useEffect, useState } from 'react';

import PostItem from '../posts/PostItem';
import FollowButton from '../layout/FollowButton';
import Spinner from '../layout/Spinner';
import { useParams } from 'react-router';

import { useSelector, useDispatch } from 'react-redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { fetchPostsByTag } from '../../store/post/post-actions';

const TagPage = (props) => {
  const dispatch = useDispatch();
  const tagPosts = useSelector((state) => state.post.postsByTag);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const [values, setValues] = useState({
    following: null,
  });

  const { id } = useParams();
  console.log('TAG NAME', id);

  useEffect(() => {
    dispatch(fetchPostsByTag(id));
    let following = checkFollow(currentUser.followTags, id);
    setValues({
      ...values,
      following,
    });
  }, [dispatch]);

  const checkFollow = (user, currentTag) => {
    const match = user.some((tag) => tag === currentTag);
    return match;
  };

  const clickFollowButton = (followApi) => {
    dispatch(followApi(id)).then((data) => {
      setValues({
        ...values,
        following: !values.following,
      });
    });
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">#{id}</Typography>
      <FollowButton
        profile={false}
        following={values.following}
        onButtonClick={clickFollowButton}
      />
      {/* <Paper elevation={3}> */}
      {tagPosts !== null ? (
        tagPosts.map((post, i) => <PostItem key={i} post={post} />)
      ) : (
        <Spinner />
      )}
      {/* </Paper> */}
    </Container>
  );
};

export default TagPage;
