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
      return res;
    };

    try {
      const post = await sendReq();

      dispatch(
        postActions.addComment({
          ...post.data.data.comment,
          user: {
            id: user.id,
            avatar: user.avatar,
            name: user.name,
            _id: user.id,
          },
        })
      );
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
//if current is not passed user is liking currentPost
//if in current is  passing object {postId, currentUserId}, user liking post in a list
export const likePost = (postId, currentUser) => {
  return async (dispatch) => {
    dispatch(postActions.likePost({ postId, currentUser }));
    const sendReq = async () => {
      const res = await axios.patch(`/api/v1/posts/${postId}/like`, null, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      if (!res) {
        throw new Error('Could not like the post');
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

export const unlikePost = (postId, currentUser) => {
  return async (dispatch) => {
    dispatch(postActions.unlikePost({ postId, currentUser }));

    const sendReq = async () => {
      const res = await axios.patch(`/api/v1/posts/${postId}/unlike`, null, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      if (!res) {
        throw new Error('Could not unlike the post');
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

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/v1/posts/${postId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      // dispatch(postActions.deletePost(postId));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------

export const fetchCommetsFromPost = async (postId) => {
  return async (dispatch) => {
    const sendReq = async () => {
      const res = await axios.get(`/api/v1/posts/${postId}/comments`);

      return res.data.data.comments;
    };

    try {
      const comments = await sendReq();

      dispatch(postActions.getCommentsFromPost(comments));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------
