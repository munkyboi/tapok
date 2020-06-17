import {
  SET_STORYS,
  LOADING_DATA,
  LIKE_STORY,
  UNLIKE_STORY,
  DELETE_STORY,
  SET_ERRORS,
  POST_STORY,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_STORY,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// Get all storys
export const getStorys = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/storys')
    .then((res) => {
      dispatch({
        type: SET_STORYS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_STORYS,
        payload: []
      });
    });
};
export const getStory = (storyId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/story/${storyId}`)
    .then((res) => {
      dispatch({
        type: SET_STORY,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a story
export const postStory = (newStory) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/story', newStory)
    .then((res) => {
      dispatch({
        type: POST_STORY,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a story
export const likeStory = (storyId) => (dispatch) => {
  axios
    .get(`/story/${storyId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_STORY,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a story
export const unlikeStory = (storyId) => (dispatch) => {
  axios
    .get(`/story/${storyId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_STORY,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (storyId, commentData) => (dispatch) => {
  axios
    .post(`/story/${storyId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteStory = (storyId) => (dispatch) => {
  axios
    .delete(`/story/${storyId}`)
    .then(() => {
      dispatch({ type: DELETE_STORY, payload: storyId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_STORYS,
        payload: res.data.storys
      });
    })
    .catch(() => {
      dispatch({
        type: SET_STORYS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
