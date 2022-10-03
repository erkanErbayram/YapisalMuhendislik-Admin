import React, { Fragment, useEffect, useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { getCategory } from "../../redux/actions/categoryActions";

import { setCategory } from "../../redux/actions/subCategoryActions";
const SubCategoryAdd = ({
  getCategory,
  setCategory,
  category: { categories },
}) => {
  const [formData, setFormData] = useState({
    subCategoryName: "",
    category: "",
  });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const { subCategoryName, category } = formData;
  useEffect(() => {
    getCategory();
  }, [categories]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (selectedCategoryIndex === 0) {
      return;
    }
    setCategory({ subCategoryName, category });
    history.push("/AltKategoriler");
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
                        <span>Alt Kategori Ekle</span>
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
                                onSubmit={(e) => onSubmit(e)}
                                className="form-horizontal"
                              >
                                <div className="form-body">
                                  <h3 className="form-section">
                                    Alt Kategori Ekle
                                  </h3>
                                  <div className="form-group ">
                                    <label
                                      className="control-label col-md-3"
                                      htmlFor="inputSuccess"
                                    >
                                      Alt Kategori Adı
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="subCategoryName"
                                        onChange={(e) => onChange(e)}
                                        value={subCategoryName}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="control-label col-md-3">
                                      Kategori
                                    </label>
                                    <div class="col-md-4">
                                      <select
                                        onChange={(e) => {
                                          setSelectedCategoryIndex(
                                            e.target.selectedIndex
                                          );
                                          onChange(e);
                                        }}
                                        required={
                                          selectedCategoryIndex === 0
                                            ? true
                                            : false
                                        }
                                        class="form-control"
                                        name="kategori"
                                      >
                                        <option value="">
                                          Kategori Seçiniz
                                        </option>
                                        {categories.map((category, index) => (
                                          category.isActive ? (
                                            <option
                                              key={index}
                                              value={category._id}
                                            >
                                              {category.categoryName}
                                            </option>
                                          ) : (
                                            ""
                                          )
                                        ))}
                                      </select>
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
                                      <Link to="/AltKategoriler">
                                      <button
                                        type="button"
                                        className="btn default"
                                      >
                                        İptal
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
SubCategoryAdd.propTypes = {
  setCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
});
export default connect(mapStateToProps, { getCategory, setCategory })(
  SubCategoryAdd
);
