import { Fragment, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import AltKategoriEkle from "./components/AltKategoriler/AltKategoriEkle";
import AltKategoriGuncelle from "./components/AltKategoriler/AltKategoriGuncelle";
import AltKategoriList from "./components/AltKategoriler/AltKategoriList";
import Footer from "./components/Footer";
import KategoriEkle from "./components/Kategoriler/KategoriEkle";
import KategoriGuncelle from "./components/Kategoriler/KategoriGuncelle";
import KategoriList from "./components/Kategoriler/KategoriList";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import ProjeEkle from "./components/Projeler/ProjeEkle";
import ProjeGuncelle from "./components/Projeler/ProjeGuncelle";
import ProjeList from "./components/Projeler/ProjeList";
import ReferansEkle from "./components/Referanslar/ReferansEkle";
import ReferansGuncelle from "./components/Referanslar/ReferansGuncelle";
import ReferansList from "./components/Referanslar/ReferansList";
import setAuthToken from "./utils/setAuthToken";
import { connect } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";
import { LOGOUT } from "./redux/actions/Types";
import SlaytList from "./components/Slaytlar/SlaytList";
import SlaytEkle from "./components/Slaytlar/SlaytEkle";
import NotFound from "./components/NotFound";
import SlaytGuncelle from "./components/Slaytlar/SlaytGuncelle";
const App = ({ isAuthenticated }) => {
  useEffect(() => {
    /*     setAuthToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrdWxsYW5pY2kiOnsiaWQiOiI1ZDM5NzJhZjA2MjlmMjNmNGM1ZTM1OTAifSwiaWF0IjoxNTk1MTgyNDA0LCJleHAiOjE1OTUyMTg0MDR9.F3gzbzOeIJuBGT7ncSfJj0vtWISOldb8xTDd6Dsp4mc"
    ); */
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
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
      <Fragment
        
      >
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
    <PrivateRoute exact path="/" component={ProjeList} />
    <PrivateRoute exact path="/Kategoriler" component={KategoriList} />
    <PrivateRoute exact path="/KategoriEkle" component={KategoriEkle} />
    <PrivateRoute exact path="/AltKategoriler" component={AltKategoriList} />
    <PrivateRoute exact path="/AltKategoriEkle" component={AltKategoriEkle} />
    <PrivateRoute exact path="/ReferansEkle" component={ReferansEkle} />
    <PrivateRoute exact path="/Referanslar" component={ReferansList} />
    <PrivateRoute exact path="/ProjeEkle" component={ProjeEkle} />
    <PrivateRoute exact path="/KategoriGuncelle" component={KategoriGuncelle} />
    <PrivateRoute exact path="/Slaytlar" component={SlaytList} />
    <PrivateRoute exact path="/SlaytGuncelle" component={SlaytGuncelle} />
    <PrivateRoute exact path="/SlaytEkle" component={SlaytEkle} />
    <PrivateRoute
      exact
      path="/AltKategoriGuncelle"
      component={AltKategoriGuncelle}
    />
    <PrivateRoute exact path="/ReferansGuncelle" component={ReferansGuncelle} />
    <PrivateRoute exact path="/ProjeGuncelle" component={ProjeGuncelle} />
   {/*  <Footer /> */}
  </div>
);
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
