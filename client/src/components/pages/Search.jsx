import React, { useEffect } from 'react';
import TabPanel from '../tabs-panel/TabPanel';
import { Container, Typography } from '@material-ui/core';
import Footer from '../layout/Footer';

import { useLocation } from 'react-router-dom';

import PostsTab from '../search/PostsTab';
import TagsTab from '../search/TagsTab';
import UsersTab from '../search/UsersTab';

import { searchPosts } from '../../store/post/post-actions';
import { searchUsers } from '../../store/user/user-actions';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const tabs = [
    { tabName: 'Posts', tabNo: 0, component: <PostsTab /> },
    { tabName: 'Tags', tabNo: 1, component: <TagsTab /> },
    { tabName: 'Users', tabNo: 2, component: <UsersTab /> },
  ];

  useEffect(() => {
    if (location?.state?.query) {
      dispatch(searchPosts(location.state.query));
      dispatch(searchUsers(location.state.query));
    }
  }, [dispatch, location]);

  return (
    <>
      <Container maxWidth="lg">
        <TabPanel
          tabs={tabs}
          query={location.search}
          tabTitle={'Search results'}
        />
      </Container>
      <Footer />
    </>
  );
};

export default Search;
