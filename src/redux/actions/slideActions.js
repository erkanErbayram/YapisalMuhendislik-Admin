import {
  GET_SLIDE,
  GET_SLIDE_ERROR,
  SET_SLIDE_ERROR,
  SET_SLIDE,
  UPDATE_SLIDE,
  UPDATE_SLIDE_ERROR,
  DELETE_SLIDE,
  DELETE_SLIDE_ERROR,
} from "./Types";

import Axios from "axios";

export const getSlide = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/slide");
    dispatch({
      type: GET_SLIDE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SLIDE_ERROR,
      payload: "HATA",
    });
  }
};

export const setSlide = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const res = await Axios.post("/api/slide", formData, config);
    dispatch({
      type: SET_SLIDE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_SLIDE_ERROR,
    });
  }
};
export const deleteSlide = ({ isActive, id }) => async (dispatch) => {
  const body = { isActive };

  try {
    
    await Axios.put(`/api/slide/delete/${id}`, body);
    dispatch({
      type: DELETE_SLIDE,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_SLIDE_ERROR,
      payload: "Hata",
    });
  }
};
export const updateSlide = (formData, id) => async (dispatch) => {

  try {
    await Axios.put(`/api/slide/update/${id}`, formData);
    dispatch({
      type: UPDATE_SLIDE,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: UPDATE_SLIDE_ERROR,
      payload: "Hata",
    });
  }
};
