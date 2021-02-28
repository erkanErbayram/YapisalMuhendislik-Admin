import React, { Fragment, useEffect, useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { getKategori } from "../../redux/actions/kategoriActions";

import { setAltKategori } from "../../redux/actions/altKategoriActions";
const AltKategoriEkle = ({
  getKategori,
  setAltKategori,
  kategori: { kategoriler },
}) => {
  const [formData, setFormData] = useState({
    altKategoriAdi: "",
    kategori: "",
  });
  const [secilenKategoriIndex, setSecilenKategoriIndex] = useState(0);
  const { altKategoriAdi, kategori } = formData;
  useEffect(() => {
    getKategori();
  }, [kategoriler]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (secilenKategoriIndex === 0) {
      return;
    }
    setAltKategori({ altKategoriAdi, kategori });
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
                                        name="altKategoriAdi"
                                        onChange={(e) => onChange(e)}
                                        value={altKategoriAdi}
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
                                          setSecilenKategoriIndex(
                                            e.target.selectedIndex
                                          );
                                          onChange(e);
                                        }}
                                        required={
                                          secilenKategoriIndex === 0
                                            ? true
                                            : false
                                        }
                                        class="form-control"
                                        name="kategori"
                                      >
                                        <option value="">
                                          Kategori Seçiniz
                                        </option>
                                        {kategoriler.map((kategori, index) => (
                                          kategori.aktifMi ? (
                                            <option
                                              key={index}
                                              value={kategori._id}
                                            >
                                              {kategori.kategoriAdi}
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

             {/*  <a href="javascript:;" className="page-quick-sidebar-toggler">
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
AltKategoriEkle.propTypes = {
  setKategori: PropTypes.func.isRequired,
  deleteKategori: PropTypes.func.isRequired,
  setAltKategori: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  kategori: state.kategori,
});
export default connect(mapStateToProps, { getKategori, setAltKategori })(
  AltKategoriEkle
);
