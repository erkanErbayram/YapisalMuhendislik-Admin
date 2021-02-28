import {
  GET_PROJE_ERROR,
  GET_PROJE,
  SET_PROJE,
  SET_PROJE_ERROR,
  PUT_PROJE,
  PUT_PROJE_ERROR,
  DELETE_PROJE,
  DELETE_PROJE_ERROR,
} from "../actions/Types";

import Axios from "axios";
export const getProje = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/proje");
    
    dispatch({
      type: GET_PROJE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROJE_ERROR,
      payload: "HATA",
    });
  }
};
export const setProje = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    debugger
    const res = await Axios.post("/api/proje/yeniKayit", formData, config);
    
    dispatch({
      type: SET_PROJE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_PROJE_ERROR,
    });
  }
};
export const deleteProje = ({ aktifMi, id }) => async (dispatch) => {
  const body = { aktifMi };

 
  try {
    await Axios.put(`/api/proje/sil/${id}`, body);
    dispatch({
      type: DELETE_PROJE,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_PROJE_ERROR,
      payload: "Hata",
    });
  }
};
export const putProje = (formData, id) => async (dispatch) => {
  try {
    debugger
    await Axios.put(`/api/proje/guncelle/${id}`, formData);
    dispatch({
      type: PUT_PROJE,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: PUT_PROJE_ERROR,
      payload: "Hata",
    });
  }
};
