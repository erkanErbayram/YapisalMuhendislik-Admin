import {
  GET_PROJECT,
  SET_PROJECT,
  SET_PROJECT_ERROR,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../actions/Types";
const initialState = {
  loading: true,
  projects: [],
};
export default function projectReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case SET_PROJECT:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case UPDATE_PROJECT:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case DELETE_PROJECT:
        return {
          ...state,
          ...payload,
          loading: false,
        };
    case SET_PROJECT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
