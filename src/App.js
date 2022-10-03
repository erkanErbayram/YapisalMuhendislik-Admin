import { Fragment, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import { connect } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";
import { LOGOUT } from "./redux/actions/Types";
import NotFound from "./components/NotFound";
import ProjectList from "./components/Projects/ProjectList";
import CategoryList from "./components/Categories/CategoryList";
import CategoryAdd from "./components/Categories/CategoryAdd";
import SubCategoryList from "./components/SubCategories/SubCategoryList";
import SubCategoryAdd from "./components/SubCategories/SubCategoryAdd";
import ReferenceAdd from "./components/References/ReferenceAdd";
import ReferenceList from "./components/References/ReferenceList";
import ProjectAdd from "./components/Projects/ProjectAdd";
import CategoryUpdate from "./components/Categories/CategoryUpdate";
import SlideList from "./components/Slides/SlideList";
import SlideUpdate from "./components/Slides/SlideUpdate";
import SlideAdd from "./components/Slides/SlideAdd";
import ReferenceUpdate from "./components/References/ReferenceUpdate";
import ProjectUpdate from "./components/Projects/ProjectUpdate";
import SubCategoryUpdate from "./components/SubCategories/SubCategoryUpdate";
const App = ({ isAuthenticated }) => {
  useEffect(() => {
 
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return <Redirect to="/login" />;
    }
  }, []);
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <Route path="/" component={DefaultContainer} />
        </Switch>
      </Fragment>
    </Router>
  );
};
const LoginContainer = () => (
  <>
    <Route exact path="/login" render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} />
  </>
);

const DefaultContainer = () => (
  <div>
    <Navbar />
    <PrivateRoute exact path="/" component={ProjectList} />
    <PrivateRoute exact path="/Kategoriler" component={CategoryList} />
    <PrivateRoute exact path="/KategoriEkle" component={CategoryAdd} />
    <PrivateRoute exact path="/AltKategoriler" component={SubCategoryList} />
    <PrivateRoute exact path="/AltKategoriEkle" component={SubCategoryAdd} />
    <PrivateRoute exact path="/ReferansEkle" component={ReferenceAdd} />
    <PrivateRoute exact path="/Referanslar" component={ReferenceList} />
    <PrivateRoute exact path="/ProjeEkle" component={ProjectAdd} />
    <PrivateRoute exact path="/KategoriGuncelle" component={CategoryUpdate} />
    <PrivateRoute exact path="/Slaytlar" component={SlideList} />
    <PrivateRoute exact path="/SlaytGuncelle" component={SlideUpdate} />
    <PrivateRoute exact path="/SlaytEkle" component={SlideAdd} />
    <PrivateRoute
      exact
      path="/AltKategoriGuncelle"
      component={SubCategoryUpdate}
    />
    <PrivateRoute exact path="/ReferansGuncelle" component={ReferenceUpdate} />
    <PrivateRoute exact path="/ProjeGuncelle" component={ProjectUpdate} />
   {/*  <Footer /> */}
  </div>
);
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
