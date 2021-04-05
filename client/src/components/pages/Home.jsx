import React from 'react';
import styled from 'styled-components';

import TrendingPosts from '../layout/TrendingPosts';
import NewestPosts from '../layout/NewestPosts';
import SocialLinks from '../layout/SocialLinks';

const Home = () => {
  return (
    <Container>
      <LeftContainer>
        <TrendingPosts />
      </LeftContainer>
      <RightContainer>
        <SocialLinks />
        <NewestPosts />
      </RightContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 1600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: 400px) {
    display: block;
  }
`;
const LeftContainer = styled.div`
  width: 75%;
  margin-right: 30px;
`;
const RightContainer = styled.div`
  width: 300px;
`;
