import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import PostContext from '../../context/post/postContext';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import { useParams } from 'react-router';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const TagPage = (props) => {
  const { id } = useParams();

  const postContext = useContext(PostContext);
  const { tagPosts, getPostsByTag } = postContext;

  useEffect(() => {
    getPostsByTag(id);
    console.log(tagPosts);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h2">#{id}</Typography>
      <Paper elevation={3}>
        {tagPosts !== null ? (
          tagPosts.map((post, i) => <PostItem key={i} post={post} />)
        ) : (
          <Spinner />
        )}
      </Paper>
    </Container>
  );
};

export default TagPage;
