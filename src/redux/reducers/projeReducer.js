import {
  GET_PROJE,
  SET_PROJE,
  SET_PROJE_ERROR,
  PUT_PROJE,
  DELETE_PROJE,
} from "../actions/Types";
const initialState = {
  loading: true,
  projeler: [],
};
export default function projeReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJE:
      return {
        ...state,
        projeler: payload,
        loading: false,
      };
    case SET_PROJE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case PUT_PROJE:
      return {
        ...state,
        ...payload,
        loading: false,
      };
      case DELETE_PROJE:
        return {
          ...state,
          ...payload,
          loading: false,
        };
    case SET_PROJE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
