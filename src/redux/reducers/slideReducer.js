import {
  GET_SLIDE,
  GET_SLIDE_ERROR,
  SET_SLIDE_ERROR,
  SET_SLIDE,
  UPDATE_SLIDE,
  UPDATE_SLIDE_ERROR,
  DELETE_SLIDE,
  DELETE_SLIDE_ERROR,
} from "../actions/Types";
const initialState = {
  loading: true,
  slides: [],
};
export default function slideReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SLIDE:
      return {
        ...state,
        slides: payload,
        loading: false,
      };
    case SET_SLIDE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case UPDATE_SLIDE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case DELETE_SLIDE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case UPDATE_SLIDE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case DELETE_SLIDE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_SLIDE_ERROR:
      return {
        ...state,
        loading: false,
      };
    case SET_SLIDE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
