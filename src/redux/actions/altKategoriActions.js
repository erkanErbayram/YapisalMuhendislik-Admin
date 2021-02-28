import {
  GET_ALTKATEGORI,
  GET_ALTKATEGORI_ERROR,
  SET_ALTKATEGORI,
  SET_ALTKATEGORI_ERROR,
  PUT_ALTKATEGORI,
  DELETE_ALTKATEGORI,
  PUT_ALTKATEGORI_ERROR,
  DELETE_ALTKATEGORI_ERROR,
  ERROR_ALTKATEGORI_WITH_KATEGORI,
  GET_ALTKATEGORI_WITH_KATEGORI,
} from "./Types";

import Axios from "axios";
export const getAltKategori = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/altKategori");
    dispatch({
      type: GET_ALTKATEGORI,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALTKATEGORI_ERROR,
      payload: "HATA",
    });
  }
};
export const getAltKategoriWithKategori = (kategori) => async (dispatch) => {
  try {
    const res = await Axios.get(`/api/altKategori/${kategori}`);

    dispatch({
      type: GET_ALTKATEGORI_WITH_KATEGORI,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_ALTKATEGORI_WITH_KATEGORI,
      payload: "HATA",
    });
  }
};
export const setAltKategori = ({ altKategoriAdi, kategori }) => async (
  dispatch
) => {
  const body = { altKategoriAdi, kategori };
  let res;

  try {
    res = await Axios.post("/api/altKategori/yeniKayit", body);
    dispatch({
      type: SET_ALTKATEGORI,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_ALTKATEGORI_ERROR,
    });
  }
};

export const deleteAltKategori = ({ aktifMi, id }) => async (dispatch) => {
  const body = { aktifMi };
  try {
    await Axios.put(`/api/altKategori/sil/${id}`, body);
    dispatch({
      type: DELETE_ALTKATEGORI,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_ALTKATEGORI_ERROR,
      payload: "Hata",
    });
  }
};
export const putAltKategori = (altKategoriAdi, kategori, id) => async (
  dispatch
) => {
  const body = { altKategoriAdi, kategori };
  try {
    await Axios.put(`/api/altKategori/guncelle/${id}`, body);
    dispatch({
      type: PUT_ALTKATEGORI,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: PUT_ALTKATEGORI_ERROR,
      payload: err.response.data,
    });
  }
};
