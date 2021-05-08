import React from 'react';
import styled from 'styled-components';

const SocialLinks = () => {
  return (
    <Container>
      <Youtube>
        <a href="https://www.youtube.com/">
          <i className="fab fa-youtube"></i>
        </a>
      </Youtube>
      <Github>
        <a href="https://www.youtube.com/">
          <i className="fab fa-github"></i>
        </a>
      </Github>
      <LinkedIn>
        <a href="https://www.youtube.com/">
          <i className="fab fa-linkedin"></i>
        </a>
      </LinkedIn>
    </Container>
  );
};

export default SocialLinks;

const Container = styled.div`
  width: 100%;
  height: 150px;
  /* border: 1px solid blue; */
  margin-top: 40px;
  display: flex;
  justify-content: space-evenly;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h3`
  color: #8191a0;
  hr {
    border-top: rgb(235, 238, 240);
  }
`;

const Youtube = styled.div`
  a {
    color: rgb(117, 117, 117);
    font-size: 35px;
  }
  a:hover {
    color: red;
  }
`;

const Github = styled.div`
  a {
    color: rgb(117, 117, 117);
    font-size: 35px;
  }
  a:hover {
    color: rgb(71, 71, 71);
  }
`;

const LinkedIn = styled.div`
  a {
    color: rgb(117, 117, 117);
    font-size: 35px;
  }
  a:hover {
    color: #0a66c2;
  }
`;
