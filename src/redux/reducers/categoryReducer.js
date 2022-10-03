import {
  UPDATE_CATEGORY,
  GET_CATEGORY,
  SET_CATEGORY,
  DELETE_CATEGORY,
  SET_CATEGORY_ERROR,
  GET_CATEGORY_ID
} from "../actions/Types";

const initialState = {
  loading: true,
  categories: [],
  categoryID:{},
  error: "",
};
export default function categoryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        categories: payload,
        loading: false,
        error:null
      };
      case GET_CATEGORY_ID:
      return {
        ...state,
        categoryID: payload,
        loading: false,
        error:null
      };
    case SET_CATEGORY:
      return {
        ...state,
        ...payload,
        loading: false,
        error:"Kategori Eklendi"
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case SET_CATEGORY_ERROR:
      return {
        ...state,       
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
