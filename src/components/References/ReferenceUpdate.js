import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateReference } from "../../redux/actions/referenceActions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const ReferenceUpdate = ({ location: { state }, updateReference }) => {
  const [formData, setFormData] = useState({
    companyName: state == null ? "" : state.companyName,
  });
  let history = useHistory();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { companyName } = formData;
  const [copyImage, setCopyImage] = useState([]);
  const [image, setImage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [hata, setHata] = useState(false);
  useEffect(() => {
    if (typeof state === "undefined") {
      return history.push("/Referanslar");
    }
  }, []);
  const onChangeImage = (e) => {
    if (selectedFiles.length > 0) {
      e.target.files = null;
      setSelectedFiles([]);
    }
    setHata(false);
    setImage(e.target.files);
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );

      if (copyImage.length === 0) {
        setCopyImage(filesArray);
      }
    }
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

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
  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img
          onClick={() => setIsOpen(true)}
          className="img-preview"
          src={photo}
          alt=""
          key={photo}
        />
      );
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("companyName", companyName);
    for (const key of Object.keys(image)) {
      form_data.append("image", image[key]);
    }
    updateReference(form_data, state._id);
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
                                        name="companyName"
                                        onChange={(e) => onChange(e)}
                                        value={companyName}
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
                                                onChangeImage(e);
                                              }}
                                              type="file"
                                              name="image"
                                              required={hata ? true : false}
                                            />{" "}
                                          </span>
                                        </div>
                                        <div>
                                          {" "}
                                          {selectedFiles.length === 0 ? (
                                            <img
                                              onClick={() => setIsOpen(true)}
                                              className="img-preview"
                                              src={
                                                state == null ? "" : state.image
                                              }
                                              alt=""
                                              key={
                                                state == null ? "" : state.image
                                              }
                                            />
                                          ) : (
                                            renderPhotos(selectedFiles)
                                          )}
                                        </div>

                                        {isOpen && (
                                          <Lightbox
                                            mainSrc={
                                              selectedFiles.length === 0
                                                ? state.image
                                                : selectedFiles[photoIndex]
                                            }
                                            onCloseRequest={() =>
                                              setIsOpen(false)
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ReferenceUpdate.propTypes = {
  updateReference: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  updateReference,
})(ReferenceUpdate);
