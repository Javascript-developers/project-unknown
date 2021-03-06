import { TextareaAutosize } from '@material-ui/core';
import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    currentPost: null,
    currentPostLikes: 0,
    currentPostLiked: null,
    newPost: null,
    post: null,
    posts: [],
    myPosts: null,
    trending: [],
    newest: null,
    commentsFromPost: [],
    postsByTag: null,
    userPosts: [],
    liked: null,

    //------Infinite Scroll State------
    myFeed: [],
    infScrLoading: true,
    infScrError: false,
    infScrHasMore: false,

    //------Searched Posts------
    searchedPosts: null,
  },
  reducers: {
    //------Searched Posts------
    addSearchPosts(state, action) {
      state.searchedPosts = action.payload;
    },

    //--------Infinite Scroll Actions -----------
    InfScrSetLoading(state, action) {
      state.infScrLoading = action.payload;
    },
    InfScrSetError(state, action) {
      state.infScrError = action.payload;
    },
    InfScrSetHasMore(state, action) {
      state.infScrHasMore = action.payload;
    },

    myFeed(state, action) {
      //TODO: understand more functions with callbacks
      function unique(posts, postId) {
        let filteredPosts = new Set();
        return posts.filter((post) => {
          let id = postId(post);
          return filteredPosts.has(id) ? false : filteredPosts.add(id);
        });
      }

      const filtratedFeed = [...state.myFeed, ...action.payload];

      state.myFeed = unique(filtratedFeed, (it) => it._id);

      //SET f. to return unique posts
      // state.myFeed = [...new Set([...state.myFeed, ...action.payload])];
    },
    //---------------------------------------------

    getPostsByTag(state, action) {
      state.postsByTag = action.payload;
    },

    addCurrentPost(state, action) {
      state.currentPost = action.payload;
    },

    getTrendingPosts(state, action) {
      //FIXME: needs to be handled by backend
      //FIXME: will give an error when you
      // access a post that is not on the 4 added with addPost() action bellow
      // state.trending = action.payload.slice(0, 4);
      state.trending = action.payload;
    },

    createPost(state, action) {
      state.trending.push(action.payload);
      state.newPost = action.payload;
    },

    cleanUpNewPost(state) {
      state.newPost = null;
    },

    addPost(state, action) {
      const id = action.payload;
      const post = state.trending.find((post) => post._id === id);

      state.currentPostLikes = post.likes.length;
      state.post = post;
      state.commentsFromPost = post.comments.map((comment) => comment);
    },

    addComment(state, action) {
      state.commentsFromPost.push(action.payload);
    },

    addReply(state, action) {
      const commentIndex = state.commentsFromPost.findIndex(
        (com) => com._id === action.payload.commentId
      );

      state.commentsFromPost[commentIndex].replies.push(action.payload.reply);
    },
    removeReply(state, action) {
      const { replyId } = action.payload;

      state.commentsFromPost = state.commentsFromPost.map((com) => ({
        ...com,
        replies: com.replies.filter((reply) => reply._id !== replyId),
      }));
    },

    removeComment(state, action) {
      state.commentsFromPost = state.commentsFromPost.filter(
        (comment) => comment.id !== action.payload
      );
    },

    myPosts(state, action) {
      state.myPosts = action.payload;
    },

    visitUser(state, action) {
      state.userPosts = action.payload;
    },

    getPosts(state, action) {
      state.posts = action.payload;
    },

    checkLike(state, action) {
      const liked = state.post.likes.indexOf(action.payload._id) !== -1;
      state.currentPostLiked = liked;
    },

    //---------------------------------
    //if action payload.currentUser is passed as true means user is liking
    //list of posts / else - is liking a currentPost
    likePost(state, action) {
      if (!action.payload.currentUser) {
        state.currentPostLikes++;
        state.currentPostLiked = true;
      } else {
        const postIndex = state.trending.findIndex(
          (post) => post._id === action.payload.postId
        );
        state.trending[postIndex].likes.push(action.payload.currentUser);
      }
    },

    unlikePost(state, action) {
      if (!action.payload.currentUser) {
        state.currentPostLikes--;
        state.currentPostLiked = false;
      } else {
        const postIndex = state.trending.findIndex(
          (post) => post._id === action.payload.postId
        );
        state.trending[postIndex].likes.pop(action.payload.currentUser);
      }
    },
    //----------------------------------

    // deletePost(state, action) {
    //   const postIndex = state.trending.findIndex(
    //     (post) => post._id === action.payload
    //   );

    //   state.trending[postIndex].pop();
    // },

    //------------------------------------

    getCommentsFromPost(state, action) {
      state.commentsFromPost = action.payload;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
