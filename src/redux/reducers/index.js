import { combineReducers } from "redux";
import auth from "./authReducer";
import kategori from "./kategoriReducer";
import altKategori from "./altKategoriReducers";
import projeReducer from "./projeReducer";
import referansReducer from "./referansReducer";
import slaytReducer from "./slaytReducer";

export default combineReducers({
  auth,
  kategori,
  altKategori,
  projeReducer,
  referansReducer,
  slaytReducer,
});
