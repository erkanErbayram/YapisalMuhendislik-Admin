import {
  GET_REFERANS_ERROR,
  GET_REFERANS,
  SET_REFERANS,
  SET_REFERANS_ERROR,
  PUT_REFERANS,
  PUT_REFERANS_ERROR,
  DELETE_REFERANS,
  DELETE_REFERANS_ERROR,
} from "../actions/Types";

import Axios from "axios";

export const getReferans = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/referans");
    dispatch({
      type: GET_REFERANS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REFERANS_ERROR,
      payload: "HATA",
    });
  }
};
export const setReferans = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      
    },
  };
  try {
    const res = await Axios.post("/api/referans/yeniKayit", formData, config);
    dispatch({
      type: SET_REFERANS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_REFERANS_ERROR,
    });
  }
};
export const deleteReferans = ({ aktifMi, id, }) => async (dispatch) => {
  const body = { aktifMi };

 
  try {
    debugger
    await Axios.put(`/api/referans/sil/${id}`, body);
    dispatch({
      type: DELETE_REFERANS,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_REFERANS_ERROR,
      payload: "Hata",
    });
  }
};
export const putReferans = (formData, id) => async (dispatch) => {
 
 
  try {
    await Axios.put(`/api/referans/guncelle/${id}`, formData, );
    dispatch({
      type: PUT_REFERANS,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: PUT_REFERANS_ERROR,
      payload: "Hata",
    });
  }
};
