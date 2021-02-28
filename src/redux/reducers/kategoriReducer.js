import {
  PUT_KATEGORI,
  GET_KATEGORI,
  SET_KATEGORI,
  DELETE_KATEGORI,
  SET_KATEGORI_ERROR,
  GET_KATEGORI_ID
} from "../actions/Types";

const initialState = {
  loading: true,
  kategoriler: [],
  kategoriID:{},
  error: "",
};
export default function kategoriReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_KATEGORI:
      return {
        ...state,
        kategoriler: payload,
        loading: false,
        error:null
      };
      case GET_KATEGORI_ID:
      return {
        ...state,
        kategoriID: payload,
        loading: false,
        error:null
      };
    case SET_KATEGORI:
      return {
        ...state,
        ...payload,
        loading: false,
        error:"Kategori Eklendi"
      };
    case PUT_KATEGORI:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case DELETE_KATEGORI:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case SET_KATEGORI_ERROR:
      return {
        ...state,       
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
