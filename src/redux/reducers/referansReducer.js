import {
  GET_REFERANS_ERROR,
  GET_REFERANS,
  SET_REFERANS,
  PUT_REFERANS,
  DELETE_REFERANS,
  DELETE_REFERANS_ERROR,
  PUT_REFERANS_ERROR,
} from "../actions/Types";
const initialState = {
  loading: true,
  ReferansList: [],
};
export default function referansReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REFERANS:
      return {
        ...state,
        ReferansList: payload,
        loading: false,
      };
    case SET_REFERANS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case PUT_REFERANS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case DELETE_REFERANS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case PUT_REFERANS_ERROR:
        return {
          ...state,
          loading: false,
        };
    case DELETE_REFERANS_ERROR:
      return {
        ...state,
        loading: false,
      };
      case GET_REFERANS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
