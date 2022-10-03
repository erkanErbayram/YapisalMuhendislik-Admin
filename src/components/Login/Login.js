import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../redux/actions/authActions";
import logo from "../../logo.png";
const Login = ({ login, isAuthenticated, err }) => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ height: "100%", backgroundColor: "#a0b4c9!important" }}>
      <div className="login">
        <div className="logo">
        <Link to="/" style={{ color: "white" }}>
            <img src={logo} alt="logo" />{" "}
          </Link>
        </div>
 
        <div className="content">
          <form className="login-form" onSubmit={onSubmit} method="post">
            <h3 className="form-title">Yapısal Mühendislik Admin</h3>
            <div className="alert alert-danger display-hide">
              <button className="close" data-close="alert" />
              <span> Enter any username and password. </span>
            </div>
            <div className="form-group">
              <label className="control-label visible-ie8 visible-ie9">
                E-mail
              </label>
              <div className="input-icon">
                <i className="fa fa-user" />
                <input
                  className="form-control placeholder-no-fix"
                  type="text"
                  autoComplete="off"
                  placeholder="E-mail"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />{" "}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label visible-ie8 visible-ie9">
                Password
              </label>
              <div className="input-icon">
                <i className="fa fa-lock" />
                <input
                  className="form-control placeholder-no-fix"
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />{" "}
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn green pull-right">
                {" "}
                Giriş Yap{" "}
              </button>
            </div>
          </form>
          {err !== null ? <div>{err}</div> : ""}
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  err: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  err: state.auth.error,
});
export default connect(mapStateToProps, { login })(Login);
