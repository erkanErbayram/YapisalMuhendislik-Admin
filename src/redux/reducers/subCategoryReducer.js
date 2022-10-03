import {
  GET_SUBCATEGORY,
  SET_SUBCATEGORY,
  UPDATE_SUBCATEGORY,
  GET_SUBCATEGORY_WITH_CATEGORY,
  DELETE_CATEGORY,
} from "../actions/Types";
const initialState = {
  loading: true,
  subCategoryies: [],
  subCategoryWithCategory: [],
};

export default function subCategoryReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBCATEGORY:
      return {
        ...state,
        subCategoryies: payload,
        loading: false,
      };
    case GET_SUBCATEGORY_WITH_CATEGORY:
      return {
        ...state,
        subCategoryWithCategory: payload,
        loading: false,
      };
    case SET_SUBCATEGORY:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case UPDATE_SUBCATEGORY:
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
    default:
      return state;
  }
}
