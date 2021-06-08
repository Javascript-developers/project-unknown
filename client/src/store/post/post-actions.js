import axios from 'axios';

import { uiActions } from '../UI/ui-slice';
import { postActions } from './post-slice';

//-----------------------------------------------------------

export const fetchPostsByTag = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/posts/t/${id}`);

      if (res.statusText !== 'OK') {
        throw new Error('Could not fetch tag posts');
      }
      console.log('REDUCER RES', res);

      return res.data.data.posts;
    };

    try {
      const postsData = await fetchData();
      dispatch(postActions.getPostsByTag(postsData));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const fetchCurrentPost = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/posts/${id}`);
      return res.data.data.post;
    };

    try {
      const postData = await fetchData();
      dispatch(postActions.getCurrentPost(postData));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const fetchTrendingPosts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await axios.get('/api/v1/posts');
      return res.data.data.posts;
    };

    try {
      const postsData = await fetchData();
      dispatch(postActions.getTrendingPosts(postsData));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const createCommentOnPost = (postId, commentData, user) => {
  return async (dispatch) => {
    dispatch(
      postActions.addComment({
        createdAt: Date.now(),
        comment: commentData.comment,
        post: postId,
        user: {
          id: user.id,
          avatar: user.avatar,
        },
      })
    );

    const sendReq = async () => {
      const res = await axios.post(
        `/api/v1/posts/${postId}/comments`,
        commentData,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );

      if (!res) {
        throw new Error('Could not post the comment');
      }
    };

    try {
      await sendReq();
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const deleteCommentOnPost = (postId, commentId) => {
  return async (dispatch) => {
    dispatch(postActions.removeComment(commentId));

    const sendReq = async () => {
      const res = await axios.delete(
        `/api/v1/posts/${postId}/comments/${commentId}`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );

      if (!res) {
        throw new Error('Could not delete comment');
      }
    };

    try {
      await sendReq();
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const getMyPosts = () => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get('/api/v1/posts/myPosts', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      return res.data.data.posts;
    };
    try {
      const posts = await sendReq();
      dispatch(postActions.myPosts(posts));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const getUserPosts = (userId) => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get(`/api/v1/posts/${userId}/getUserPosts`);
      return res.data.data.posts;
    };
    try {
      const posts = await sendReq();
      dispatch(postActions.visitUser(posts));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const createPost = (formData) => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.post('/api/v1/posts', formData, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      console.log('CREATE_POST', res);
      return res.data.data.post;
    };

    try {
      const post = await sendReq();
      const postBack = await axios.get(`api/v1/posts/${post.id}`);

      console.log('Post_created_and_back', postBack);
      dispatch(postActions.createPost(postBack.data.data.post));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const getPosts = () => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get('/api/v1/posts');
      return res.data.data.posts;
    };

    try {
      const posts = await sendReq();
      dispatch(postActions.getPosts(posts));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const likePost = async (postId) => {
  return async (dispatch) => {
    dispatch(postActions.likePost());
    const sendReq = async () => {
      const res = await axios.patch(`/api/v1/posts/${postId}/like`, postId, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      if (!res) {
        throw new Error('Could not like the post');
      }

      // let res = await fetch(`/api/v1/posts/${postId}/like`, {
      //   method: 'PATCH',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     Authorization: 'Bearer ' + localStorage.getItem('token'),
      //   },
      //   body: JSON.stringify({ postId: postId }),
      // });

      // return res.json();#
      console.log(postId);
    };

    try {
      const res = await sendReq();
      console.log('RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', res);

      // dispatch(postActions.likePost(postId));
      return { type: res };
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const unlikePost = async (postId) => {
  return async (dispatch) => {
    dispatch(postActions.unlikePost());

    const sendReq = async () => {
      const res = await axios.patch(`/api/v1/posts/${postId}/unlike`, postId, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      if (!res) {
        throw new Error('Could not unlike the post');
      }
      console.log(res);
    };

    try {
      const res = await sendReq();
      // dispatch(postActions.unlikePost(postId));
      console.log('RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', res);
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------
