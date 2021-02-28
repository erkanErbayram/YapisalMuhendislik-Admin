import {
  GET_SLAYT,
  GET_SLAYT_ERROR,
  SET_SLAYT_ERROR,
  SET_SLAYT,
  PUT_SLAYT,
  PUT_SLAYT_ERROR,
  DELETE_SLAYT,
  DELETE_SLAYT_ERROR,
} from "../actions/Types";
const initialState = {
  loading: true,
  slaytlar: [],
};
export default function slaytReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SLAYT:
      return {
        ...state,
        slaytlar: payload,
        loading: false,
      };
    case SET_SLAYT:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case PUT_SLAYT:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case DELETE_SLAYT:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case PUT_SLAYT_ERROR:
      return {
        ...state,
        loading: false,
      };
    case DELETE_SLAYT_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_SLAYT_ERROR:
      return {
        ...state,
        loading: false,
      };
    case SET_SLAYT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
