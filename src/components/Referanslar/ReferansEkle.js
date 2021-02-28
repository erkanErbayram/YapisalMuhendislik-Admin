import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setReferans } from "../../redux/actions/referansActions";
import { useHistory } from "react-router";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Link } from "react-router-dom";
const ReferansEkle = ({ setReferans }) => {
  const [formData, setFormData] = useState({
    firmaAdi: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
    const [hata, setHata] = useState(false);
  const [resim, setResim] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { firmaAdi } = formData;
  let history = useHistory();
  const onChangeResim = (e) => {
    if (selectedFiles.length > 0) {
      e.target.files = null;
      setSelectedFiles([]);
    }
    setResim(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );

     
    }
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      return (
        <div>
          <img
            onClick={() => setIsOpen(true)}
            className="img-preview"
            src={photo}
            alt=""
            key={photo}
          />
      
        </div>
      );
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (resim.length===0) {
      setHata(true);
      window.alert("Lütfen Resim Seçiniz");
      return;
    }
    let form_data = new FormData();
    form_data.append("firmaAdi", firmaAdi);
    for (const key of Object.keys(resim)) {
      form_data.append("resim", resim[key]);
    }

    setReferans(form_data);
    history.push("/Referanslar");
  };
  return (
    <>
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
                        <span>Referans Ekle</span>
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
                                    Referans Ekle
                                  </h3>
                                  <div className="form-group ">
                                    <label
                                      className="control-label col-md-3"
                                      htmlFor="inputSuccess"
                                    >
                                      Firma Adı
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="firmaAdi"
                                        onChange={(e) => onChange(e)}
                                        value={firmaAdi}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label className="control-label col-md-3">
                                      Resim
                                    </label>
                                    <div className="col-md-3">
                                      <div
                                        className="fileinput fileinput-new"
                                        data-provides="fileinput"
                                      >
                                        <div className="input-group input-large">
                                          <span className="input-group-addon btn default btn-file">
                                            <input
                                              onChange={(e) => {
                                                onChangeResim(e);
                                              }}
                                              type="file"
                                              name="resim"
                                              required={hata ? true : false}
                                            />{" "}
                                          </span>
                                      
                                        </div>
                                        <div>{renderPhotos(selectedFiles)}</div>
                                        {isOpen && (
                                          <Lightbox
                                            mainSrc={selectedFiles[photoIndex]}
                                            nextSrc={
                                              selectedFiles[
                                                (photoIndex + 1) %
                                                  selectedFiles.length
                                              ]
                                            }
                                            prevSrc={
                                              selectedFiles[
                                                (photoIndex +
                                                  selectedFiles.length -
                                                  1) %
                                                  selectedFiles.length
                                              ]
                                            }
                                            onCloseRequest={() =>
                                              setIsOpen(false)
                                            }
                                            onMovePrevRequest={() => {
                                           
                                              setPhotoIndex(
                                                (photoIndex +
                                                  selectedFiles.length -
                                                  1) %
                                                  selectedFiles.length
                                              );
                                            }}
                                            onMoveNextRequest={() =>
                                              setPhotoIndex(
                                                (photoIndex + 1) %
                                                  selectedFiles.length
                                              )
                                            }
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>{" "}
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
                                      <Link to="/Referanslar">
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

            {/*   <a href="javascript:;" className="page-quick-sidebar-toggler">
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
    </>
  );
};
ReferansEkle.propTypes = {
  setReferans: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  setReferans,
})(ReferansEkle);
