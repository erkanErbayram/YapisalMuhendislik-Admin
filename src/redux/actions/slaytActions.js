import {
  GET_SLAYT,
  GET_SLAYT_ERROR,
  SET_SLAYT_ERROR,
  SET_SLAYT,
  PUT_SLAYT,
  PUT_SLAYT_ERROR,
  DELETE_SLAYT,
  DELETE_SLAYT_ERROR,
} from "../actions/Types";

import Axios from "axios";

export const getSlayt = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/slayt");
    dispatch({
      type: GET_SLAYT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SLAYT_ERROR,
      payload: "HATA",
    });
  }
};

export const setSlayt = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await Axios.post("/api/slayt/yeniKayit", formData, config);
    dispatch({
      type: SET_SLAYT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_SLAYT_ERROR,
    });
  }
};
export const deleteSlayt = ({ aktifMi, id }) => async (dispatch) => {
  const body = { aktifMi };

  try {
    
    await Axios.put(`/api/slayt/sil/${id}`, body);
    dispatch({
      type: DELETE_SLAYT,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_SLAYT_ERROR,
      payload: "Hata",
    });
  }
};
export const putSlayt = (formData, id) => async (dispatch) => {

  try {
    await Axios.put(`/api/slayt/guncelle/${id}`, formData);
    dispatch({
      type: PUT_SLAYT,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: PUT_SLAYT_ERROR,
      payload: "Hata",
    });
  }
};
