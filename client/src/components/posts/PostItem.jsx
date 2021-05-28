import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'cloudinary-react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { Button, CardActionArea, CardActions } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const PostItem = ({ post }) => {
  let currentPost = post;

  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);

  const { currentUser } = authContext;
  const { likePost, unlikePost, currentPostLiked, cleanUp } = postContext;

  // const [liked, setliked] = useState(false);

  //DUPLICATE CODE IN useEffect => must get cleaner solution
  //results in to many API calls each time you like/unlike a post
  //might affect performance

  //FIXME: when user logs in likes are not displayed, needs refresh of the page

  const checkLike = (likes) => {
    let match = likes.indexOf(currentUser._id) !== -1;
    return match;
  };

  const [values, setValues] = useState({
    like: checkLike(currentPost.likes),
    likes: currentPost.likes.length,
  });

  // useEffect(() => {
  //   setValues({
  //     ...values,
  //     like: checkLike(currentPost.likes),
  //     likes: currentPost.likes.length,
  //   });
  // }, []);

  // useEffect(async () => {
  //   if (currentUser) {
  //     const currentLiked = post.likes.includes(currentUser.id);
  //     if (currentLiked) {
  //       const likedPost = await axios.get(`/api/v1/posts/${post.id}`);
  //       currentPost = likedPost.data.data.post;
  //       // console.log('LIKED POST', likedPost);
  //       setliked(true);
  //     }

  //     if (!currentLiked) {
  //       const likedPost = await axios.get(`/api/v1/posts/${post.id}`);
  //       currentPost = likedPost.data.data.post;
  //       // console.log('UNLIKED POST', likedPost);
  //       setliked(false);
  //     }
  //   }
  // }, []);

  // useEffect(async () => {
  //   if (currentUser) {
  //     const currentLiked = post.likes.includes(currentUser.id);
  //     if (currentLiked) {
  //       const likedPost = await axios.get(`/api/v1/posts/${post.id}`);
  //       currentPost = likedPost.data.data.post;
  //       // console.log('LIKED POST', likedPost);
  //     }

  //     if (!currentLiked) {
  //       const likedPost = await axios.get(`/api/v1/posts/${post.id}`);
  //       currentPost = likedPost.data.data.post;
  //       // console.log('UNLIKED POST', likedPost);
  //     }
  //   }

  //   setTimeout(() => {
  //     // console.log('CLEAN UP');
  //     cleanUp();
  //   }, 1000);
  // }, [currentPostLiked]);

  const onLikePost = () => {
    let callApi = values.like ? unlikePost : likePost;
    callApi(post.id).then((data) => {
      console.log('LIKE', data);
      setValues({
        ...values,
        like: !values.like,
        likes: data.data.post.likes.length,
      });
    });

    // if (liked) {
    //   unlikePost(post.id);
    //   setliked(false);
    // }
    // if (!liked) {
    //   likePost(post.id);
    //   setliked(true);
    // }
  };

  const likeUnlike = values.like ? <FavoriteIcon /> : <FavoriteBorderIcon />;

  // <Link to={`/post/${post._id}`}>
  return (
    <Container>
      <Card
        sx={{
          maxWidth: '100%',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} arial-label="post">
              {currentPost.user.avatar ? (
                <Image
                  cloudName="dsmrt6yiw"
                  publicId={currentPost.user.avatar}
                  width="100%"
                  // crop="scale"
                />
              ) : null}
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={currentPost.title}
          subheader={currentPost.createdAt}
        ></CardHeader>

        <Header>
          <Title>
            <h3>{currentPost.title}</h3>
            <Link to={`/user/${currentPost.user._id}`}>
              @{currentPost.user.name}
            </Link>
            <p className="author-post">@{currentPost.user.name}</p>
          </Title>
          <Tags>{currentPost.tags}</Tags>
        </Header>
        <div className="bottom-post">
          <Description>
            <p>Description of the post/ not implemented yet</p>
          </Description>
        </div>
        <CardActions>
          <IconButton onClick={onLikePost}>
            {likeUnlike} {values.likes}
          </IconButton>
          <IconButton>
            <Comments>
              <i className="far fa-comment" /> {currentPost.comments.length}
            </Comments>
          </IconButton>
          <Button size="small" color="primary">
            <Link
              style={{ textDecoration: 'none' }}
              to={`/post/${currentPost._id}`}
            >
              read more
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default PostItem;

const Container = styled.div`
  /* width: 100%;
  height: 160px; */
  /* border: 1px solid red; */
  /* background: #ffffff; */
  padding: 15px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;

  /* &:hover {
    background: #f7f9fa;
  } */

  .bottom-post {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: flex;
  color: rgba(#fff, 0.85);
  .author-post {
    color: #8191a0;
  }
`;

const Tags = styled.div``;

const Description = styled.div``;

const Likes = styled.div`
  i {
    border-radius: 50%;
    color: red;
    padding: 5px;
    &:hover {
      background-color: salmon;
    }
  }
`;

const Comments = styled.div``;

const Date = styled.div`
  color: #8191a0;
`;
