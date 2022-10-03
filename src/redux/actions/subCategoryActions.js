import {
  GET_SUBCATEGORY,
  GET_SUBCATEGORY_ERROR,
  SET_SUBCATEGORY,
  SET_SUBCATEGORY_ERROR,
  UPDATE_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  UPDATE_SUBCATEGORY_ERROR,
  DELETE_SUBCATEGORY_ERROR,
  ERROR_ALTKATEGORI_WITH_CATEGORY,
  GET_SUBCATEGORY_WITH_CATEGORY
} from "./Types";

import Axios from "axios";
export const getSubCategory = () => async dispatch => {
  try {
    const res = await Axios.get("/api/subCategory");
    dispatch({
      type: GET_SUBCATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_SUBCATEGORY_ERROR,
      payload: "HATA"
    });
  }
};
export const getSubCategoryWithCategory = category => async dispatch => {
  try {
    const res = await Axios.get(`/api/subCategory/${category}`);

    dispatch({
      type: GET_SUBCATEGORY_WITH_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ERROR_ALTKATEGORI_WITH_CATEGORY,
      payload: "HATA"
    });
  }
};
export const setCategory = ({
  subCategoryName,
  category
}) => async dispatch => {
  try {
    const body = { subCategoryName, category };

    const res = await Axios.post("/api/subCategory", body);
    dispatch({
      type: SET_SUBCATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_SUBCATEGORY_ERROR
    });
  }
};

export const deleteSubCategory = ({ isActive, id }) => async dispatch => {
  const body = { isActive };
  try {
    await Axios.put(`/api/subCategory/delete/${id}`, body);
    dispatch({
      type: DELETE_SUBCATEGORY,
      payload: "Silindi"
    });
  } catch (err) {
    dispatch({
      type: DELETE_SUBCATEGORY_ERROR,
      payload: "Hata"
    });
  }
};
export const updateSubCategory = (
  subCategoryName,
  category,
  id
) => async dispatch => {
  const body = { subCategoryName, category };
  try {
    await Axios.put(`/api/subCategory/update/${id}`, body);
    dispatch({
      type: UPDATE_SUBCATEGORY,
      payload: "Silindi"
    });
  } catch (err) {
    dispatch({
      type: UPDATE_SUBCATEGORY_ERROR,
      payload: err.response.data
    });
  }
};
