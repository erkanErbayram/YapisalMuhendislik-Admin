import {
  GET_ALTKATEGORI,
  SET_ALTKATEGORI,
  PUT_ALTKATEGORI,
  GET_ALTKATEGORI_WITH_KATEGORI,
  DELETE_KATEGORI,
} from "../actions/Types";
const initialState = {
  loading: true,
  altKategoriler: [],
  altKategorilerWithKategori: [],
};

export default function altKategoriReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALTKATEGORI:
      return {
        ...state,
        altKategoriler: payload,
        loading: false,
      };
    case GET_ALTKATEGORI_WITH_KATEGORI:
      return {
        ...state,
        altKategorilerWithKategori: payload,
        loading: false,
      };
    case SET_ALTKATEGORI:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case PUT_ALTKATEGORI:
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
    default:
      return state;
  }
}
