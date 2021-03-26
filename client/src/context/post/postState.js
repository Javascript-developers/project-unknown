import React, {useReducer} from 'react'
import PostsContext from './postContext'
import PostsReducer from './postReducer'
import {
    GET_NEWEST_POSTS,
    GET_POST,
    GET_POSTS,
    GET_TRENDING_POSTS,
    DELETE_POST,
    EDIT_POST,
    POSTS_ERROR
} from '../types'

const PostState = props => {
    const initialState = {
        currentPost = null,
        posts = null,
        trending = null,
        newest = null,
        error = null
    }

    const getPost = () => {
        try {
            dispatch({
                type:GET_POST,
                payload
            })
        } catch (err) {
            dispatch({
                type: POSTS_ERROR,
                payload: err.message
            })
        }
    }

    const [state, dispatch] = useReducer(PostsReducer, initialState)

    return (
        <PostsContext.Provider value={{
            currentPost: state.currentPost,
            posts: state.posts,
            trending: state.trending,
            newest: state.newest,
            error: state.error,
            getPost
        }}>
            {props.children}
        </PostsContext.Provider>
    )
}