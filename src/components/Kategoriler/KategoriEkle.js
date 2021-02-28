import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setKategori } from "../../redux/actions/kategoriActions";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const KategoriEkle = ({ setKategori, error, loading }) => {
  const [formData, setFormData] = useState({
    kategoriAdi: "",
  });
  const { kategoriAdi } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    setKategori({ kategoriAdi });
    setFormData({ kategoriAdi: "" });
    history.push('/Kategoriler')
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
                                onSubmit={(e) => onSubmit(e)}
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
                                      Kategori Adı
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="kategoriAdi"
                                        onChange={(e) => onChange(e)}
                                        value={kategoriAdi}
                                      />{" "}
                                    </div>
                                  </div>
                                 {/*  {loading && error === null ? (
                                    ""
                                  ) : (
                                    <div style={{ color: "red" }}>{error}</div>
                                  )} */}
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

   {/*            <a href="javascript:;" className="page-quick-sidebar-toggler">
                <i className="icon-login" />
              </a>
              <div
                className="page-quick-sidebar-wrapper"
                data-close-on-body-click="false"
              ></div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
KategoriEkle.propTypes = {
  setKategori: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  kategori: state.kategori,
  error: state.kategori.error,
  loading: state.kategori.loading,
});
export default connect(mapStateToProps, { setKategori })(KategoriEkle);
