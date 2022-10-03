import { combineReducers } from "redux";
import auth from "./authReducer";
import category from "./categoryReducer";
import subCategory from "./subCategoryReducer";
import projectReducer from "./projectReducer";
import referenceReducer from "./referenceReducer";
import slideReducer from "./slideReducer";

export default combineReducers({
  auth,
  category,
  subCategory,
  projectReducer,
  referenceReducer,
  slideReducer,
});
