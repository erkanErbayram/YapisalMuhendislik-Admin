import {
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
} from "./Types";
import Axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await Axios.get("/api/kullanici/kisi");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
 
  const body = {
    email,
    password,
  };
  try {
    const res = await Axios.post("/api/kullanici/login", body);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
 
    dispatch({
      type: LOGIN_FAIL,
      payload:errors
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  
};
