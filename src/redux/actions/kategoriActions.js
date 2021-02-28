import {
  GET_KATEGORI,
  GET_KATEGORI_ERROR,
  SET_KATEGORI,
  SET_KATEGORI_ERROR,
  PUT_KATEGORI,
  PUT_KATEGORI_ERROR,
  DELETE_KATEGORI,
  DELETE_KATEGORI_ERROR,
  GET_KATEGORI_ID
} from "./Types";
import Axios from "axios";

export const getKategori = () => async (dispatch) => {
  try {
    const res = await Axios.get("/api/kategori");
    
    dispatch({
      type: GET_KATEGORI,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_KATEGORI_ERROR,
      payload: "HATA",
    });
  }
};export const getKategoriId = (id) => async (dispatch) => {
  try {
    const res = await Axios.get("/api/kategori/"+id);
    dispatch({
      type: GET_KATEGORI_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_KATEGORI_ERROR,
      payload: "HATA",
    });
  }
};
export const deleteKategori = ({ aktifMi, id }) => async (dispatch) => {
  const body = { aktifMi };

  try {
    await Axios.put(`/api/kategori/sil/${id}`, body);
    dispatch({
      type: DELETE_KATEGORI,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: DELETE_KATEGORI_ERROR,
      payload: "Hata",
    });
  }
};
export const putKategori = ( kategoriAdi, id ) => async (dispatch) => {
  const body = { kategoriAdi }; 
  try {
    await Axios.put(`/api/kategori/guncelle/${id}`, body);
    dispatch({
      type: PUT_KATEGORI,
      payload: "Silindi",
    });
  } catch (err) {
    dispatch({
      type: PUT_KATEGORI_ERROR,
      payload: "Hata",
    });
  }
};
export const setKategori = ({ kategoriAdi }) => async (dispatch) => {
  const body = { kategoriAdi };

  try {
    
    const res = await Axios.post("/api/kategori/yeniKayit", body);
    dispatch({
      type: SET_KATEGORI,
      payload: res.data,
    });
  } catch (err) {
   
    const errors =  err.response.data.msg;
    
    dispatch({
      type: SET_KATEGORI_ERROR,
      payload:errors
    });
  }
};
