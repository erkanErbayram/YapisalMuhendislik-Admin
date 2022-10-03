import {
  GET_CATEGORY,
  GET_CATEGORY_ERROR,
  SET_CATEGORY,
  SET_CATEGORY_ERROR,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
  GET_CATEGORY_ID
} from "./Types";
import Axios from "axios";

export const getCategory = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/category");
    
    dispatch({
      type: GET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_ERROR,
      payload: "HATA",
    });
  }
};export const getCategoryId = (id) => async (dispatch) => {
  try {
    const res = await Axios.get("/api/category/"+id);
    dispatch({
      type: GET_CATEGORY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_ERROR,
      payload: "HATA",
    });
  }
};
export const deleteCategory = ({ isActive, id }) => async (dispatch) => {
  const body = { isActive };

  try {
    await Axios.put(`/api/category/delete/${id}`, body);
    dispatch({
      type: DELETE_CATEGORY,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_CATEGORY_ERROR,
      payload: "Hata",
    });
  }
};
export const updateCategory = ( categoryName, id ) => async (dispatch) => {
  const body = { categoryName }; 
  try {
    await Axios.put(`/api/category/update/${id}`, body);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: UPDATE_CATEGORY_ERROR,
      payload: "Hata",
    });
  }
};
export const setCategory = ({ categoryName }) => async (dispatch) => {
  const body = { categoryName };

  try {
    
    const res = await Axios.post("/api/category", body);
    dispatch({
      type: SET_CATEGORY,
      payload: res.data,
    });
  } catch (err) {
   
    const errors =  err.response.data.msg;
    
    dispatch({
      type: SET_CATEGORY_ERROR,
      payload:errors
    });
  }
};
