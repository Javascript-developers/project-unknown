import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import { fetchTrendingPosts, getFeed } from '../../store/post/post-actions';
import { bookmarkPost, unBookmarkPost } from '../../store/user/user-actions';

const TrendingPosts = () => {
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.post.trending);
  const feed = useSelector((state) => state.post.myFeed);
  const currentUser = useSelector((state) => state.user.currentUser);

  //InfScroll----------------------------------------------------
  const InfScrLoadig = useSelector((state) => state.post.infScrLoadig);
  const InfScrError = useSelector((state) => state.post.infScrError);
  const InfScrHasMore = useSelector((state) => state.post.infScrHasMore);

  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (InfScrLoadig) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && InfScrHasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [InfScrLoadig, InfScrHasMore]
  );

  //----------------------------------------------------------------

  useEffect(() => {
    dispatch(getFeed(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    dispatch(fetchTrendingPosts());
  }, []);

  const bookmarkOnPost = (callApi, postId) => {
    const f = callApi === 'bookmark' ? bookmarkPost : unBookmarkPost;
    dispatch(f(postId));
  };

  if (feed !== null && feed.length === 0) {
    return <h4>Please add a post...</h4>;
  }

  return (
    <Container>
      <div className="container-div">
        {feed !== null && currentUser !== null ? (
          feed.map((post, i) => {
            if (feed.length === i + 1) {
              return (
                <div
                  ref={lastPostElementRef}
                  style={{ textDecoration: 'none', color: 'black' }}
                  key={i}
                >
                  <PostItem
                    post={post}
                    user={currentUser}
                    bookmarkOnPost={bookmarkOnPost}
                  />
                </div>
              );
            } else {
              return (
                <div style={{ textDecoration: 'none', color: 'black' }} key={i}>
                  <PostItem
                    post={post}
                    user={currentUser}
                    bookmarkOnPost={bookmarkOnPost}
                  />
                </div>
              );
            }
          })
        ) : (
          <Spinner />
        )}

        <div>{InfScrLoadig && 'Loading...'}</div>
        <div>{InfScrError && 'Error'}</div>
      </div>
    </Container>
  );
};

export default TrendingPosts;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
