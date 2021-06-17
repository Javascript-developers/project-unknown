import React, { useEffect, useContext } from 'react';

import PostItem from '../posts/PostItem';
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

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPostsByTag(id));
    console.log(tagPosts);
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">#{id}</Typography>
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
