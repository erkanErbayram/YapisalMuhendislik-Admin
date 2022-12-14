import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateCategory } from "../../redux/actions/categoryActions";
import { Link, useHistory } from "react-router-dom";
const CategoryUpdate = ({
  location: { state },
  updateCategory,
  category: { err }
}) => {
  const [formData, setFormData] = useState({
    categoryName: state == null ? "" : state.categoryName
  });

  const { categoryName } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let history = useHistory();
  useEffect(() => {
    if (typeof state === "undefined") {
      return history.push("/Kategoriler");
    }
  }, []);
  const onSubmit = async e => {
    e.preventDefault();
    updateCategory(categoryName, state._id);
    if (err) {
      return;
    } else {
      history.push("/Kategoriler");
    }
  };
  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="page-wrapper-row full-height">
          <div className="page-wrapper-middle">
            <div className="page-container">
              <div className="page-content-wrapper">
                <div className="page-content">
                  <div className="container">
                    <ul className="page-breadcrumb breadcrumb">
                      <li>
                        <a href="index.html">Anasayfa</a>
                        <i className="fa fa-circle" />
                      </li>

                      <li>
                        <span>Kategori Ekle</span>
                      </li>
                    </ul>
                    <div className="page-content-inner">
                      <div className="row">
                        <div className="col-md-12">
                          <div
                            className="portlet light portlet-fit portlet-form "
                            id="form_wizard_1"
                          >
                            <div className="portlet-body">
                              {/* BEGIN FORM*/}
                              <form
                                onSubmit={e => onSubmit(e)}
                                className="form-horizontal"
                              >
                                <div className="form-body">
                                  <h3 className="form-section">
                                    Kategori Ekle
                                  </h3>
                                  <div className="form-group ">
                                    <label
                                      className="control-label col-md-3"
                                      htmlFor="inputSuccess"
                                    >
                                      Kategori Ad??
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="categoryName"
                                        onChange={e => onChange(e)}
                                        value={categoryName}
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                                <div className="form-actions">
                                  <div className="row">
                                    <div className="col-md-offset-3 col-md-9">
                                      <button
                                        type="submit"
                                        className="btn green"
                                      >
                                        Kaydet
                                      </button>
                                      <Link to="/Kategoriler">
                                        <button
                                          type="button"
                                          className="btn default"
                                        >
                                          ??ptal
                                        </button>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
CategoryUpdate.propTypes = {
  updateCategory: PropTypes.func.isRequired
};
const mapStateToProps = state => ({ category: state.category });
export default connect(mapStateToProps, { updateCategory })(CategoryUpdate);
