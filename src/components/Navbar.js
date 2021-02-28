import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import PropTypes from "prop-types";
import  logo  from '../logo.png'
const Navbar = ({ logout }) => {
  const onSubmit = () => {
    logout();
    <Redirect to="/login" />;
  };
  //../assets/layouts/layout3/img/logo-default.jpg
  return (
    <div className="page-wrapper-row">
      <div className="page-wrapper-top">
        <div className="page-header">
          <div className="page-header-top">
            <div className="container">
              <div className="page-logo">
              <Link to="/" style={{ color: "white" }}>
                  <img
                    src={logo}
                    alt="logo"
                    className="logo-default"
                  />
                </Link>
              </div>
              <a href="javascript:;" className="menu-toggler" />
              <div className="top-menu">
                <ul className="nav navbar-nav pull-right">
                  <li className="dropdown dropdown-extended quick-sidebar-toggler">
                    <span className="sr-only">Menu</span>
                    <i onClick={onSubmit} className="icon-logout" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="page-header-menu">
            <div className="container">
              {/* BEGIN HEADER SEARCH BOX */}

              {/* END HEADER SEARCH BOX */}
              {/* BEGIN MEGA MENU */}
              {/* DOC: Apply "hor-menu-light" class after the "hor-menu" class below to have a horizontal menu with white background */}
              {/* DOC: Remove data-hover="dropdown" and data-close-others="true" attributes below to disable the dropdown opening on mouse hover */}
              <div className="hor-menu  ">
                <ul className="nav navbar-nav">
                  <li
                    aria-haspopup="true"
                    className="menu-dropdown classic-menu-dropdown "
                  >
                    <Link to="/">
                      {" "}
                      Projeler
                      <span className="arrow" />
                    </Link>
                  </li>
                  <li
                    aria-haspopup="true"
                    className="menu-dropdown mega-menu-dropdown  "
                  >
                    <Link to="/Kategoriler">
                      {" "}
                      Kategoriler
                      <span className="arrow" />
                    </Link>
                  </li>
                  <li
                    aria-haspopup="true"
                    className="menu-dropdown classic-menu-dropdown "
                  >
                    <Link to="/AltKategoriler">
                      {" "}
                      Alt Kategoriler
                      <span className="arrow" />
                    </Link>
                  </li>
                  <li
                    aria-haspopup="true"
                    className="menu-dropdown mega-menu-dropdown  mega-menu-full"
                  >
                    <Link to="/Referanslar">                    
                      Referanslar
                      <span className="arrow" />
                    </Link>
                  </li>
                  <li
                    aria-haspopup="true"
                    className="menu-dropdown mega-menu-dropdown  mega-menu-full"
                  >
                    <Link to="/Slaytlar">
                      {" "}
                      Slaytlar
                      <span className="arrow" />
                    </Link>
                  </li>
                </ul>{" "}
              </div>
              {/* END MEGA MENU */}
            </div>
          </div>
          {/* END HEADER MENU */}
        </div>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logout })(Navbar);
