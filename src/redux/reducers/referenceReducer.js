import {
  GET_REFERENCE_ERROR,
  GET_REFERENCE,
  SET_REFERENCE,
  UPDATE_REFERENCE,
  DELETE_REFERENCE,
  DELETE_REFERENCE_ERROR,
  UPDATE_REFERENCE_ERROR,
} from "../actions/Types";
const initialState = {
  loading: true,
  referenceList: [],
};
export default function referenceReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_REFERENCE:
      return {
        ...state,
        referenceList: payload,
        loading: false,
      };
    case SET_REFERENCE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case UPDATE_REFERENCE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case DELETE_REFERENCE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case UPDATE_REFERENCE_ERROR:
        return {
          ...state,
          loading: false,
        };
    case DELETE_REFERENCE_ERROR:
      return {
        ...state,
        loading: false,
      };
      case GET_REFERENCE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
