import {
  GET_REFERENCE_ERROR,
  GET_REFERENCE,
  SET_REFERENCE,
  SET_REFERENCE_ERROR,
  UPDATE_REFERENCE,
  UPDATE_REFERENCE_ERROR,
  DELETE_REFERENCE,
  DELETE_REFERENCE_ERROR,
} from "./Types";

import Axios from "axios";

export const getReference = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/reference");
    dispatch({
      type: GET_REFERENCE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_REFERENCE_ERROR,
      payload: "HATA",
    });
  }
};
export const setReference = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      
    },
  };
  try {
    const res = await Axios.post("/api/reference", formData, config);
    dispatch({
      type: SET_REFERENCE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_REFERENCE_ERROR,
    });
  }
};
export const deleteReference = ({ isActive, id, }) => async (dispatch) => {
  const body = { isActive };

 
  try {
    debugger
    await Axios.put(`/api/reference/delete/${id}`, body);
    dispatch({
      type: DELETE_REFERENCE,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_REFERENCE_ERROR,
      payload: "Hata",
    });
  }
};
export const updateReference = (formData, id) => async (dispatch) => {
 
 
  try {
    await Axios.put(`/api/reference/update/${id}`, formData, );
    dispatch({
      type: UPDATE_REFERENCE,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: UPDATE_REFERENCE_ERROR,
      payload: "Hata",
    });
  }
};
