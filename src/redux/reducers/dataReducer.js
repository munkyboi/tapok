import {
  SET_STORYS,
  LIKE_STORY,
  UNLIKE_STORY,
  LOADING_DATA,
  DELETE_STORY,
  POST_STORY,
  SET_STORY,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  storys: [],
  story: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_STORYS:
      return {
        ...state,
        storys: action.payload,
        loading: false
      };
    case SET_STORY:
      return {
        ...state,
        story: action.payload
      };
    case LIKE_STORY:
    case UNLIKE_STORY:
      let index = state.storys.findIndex(
        (story) => story.storyId === action.payload.storyId
      );
      state.storys[index] = action.payload;
      if (state.story.storyId === action.payload.storyId) {
        state.story = action.payload;
      }
      return {
        ...state
      };
    case DELETE_STORY:
      index = state.storys.findIndex(
        (story) => story.storyId === action.payload
      );
      state.storys.splice(index, 1);
      return {
        ...state
      };
    case POST_STORY:
      return {
        ...state,
        storys: [action.payload, ...state.storys]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        story: {
          ...state.story,
          comments: [action.payload, ...state.story.comments]
        }
      };
    default:
      return state;
  }
}
