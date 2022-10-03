import {
  GET_PROJECT_ERROR,
  GET_PROJECT,
  SET_PROJECT,
  SET_PROJECT_ERROR,
  UPDATE_PROJECT,
  UPDATE_PROJECT_ERROR,
  DELETE_PROJECT,
  DELETE_PROJECT_ERROR,
} from "./Types";

import Axios from "axios";
export const getProject = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/project");
    
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROJECT_ERROR,
      payload: "HATA",
    });
  }
};
export const setProject = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    debugger
    const res = await Axios.post("/api/project", formData, config);
    
    dispatch({
      type: SET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SET_PROJECT_ERROR,
    });
  }
};
export const deleteProject = ({ aktifMi, id }) => async (dispatch) => {
  const body = { aktifMi };

 
  try {
    await Axios.put(`/api/project/delete/${id}`, body);
    dispatch({
      type: DELETE_PROJECT,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_PROJECT_ERROR,
      payload: "Hata",
    });
  }
};
export const updateProject = (formData, id) => async (dispatch) => {
  try {
    debugger
    await Axios.put(`/api/project/update/${id}`, formData);
    dispatch({
      type: UPDATE_PROJECT,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: UPDATE_PROJECT_ERROR,
      payload: "Hata",
    });
  }
};
