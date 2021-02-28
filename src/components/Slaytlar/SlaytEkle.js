import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setSlayt } from "../../redux/actions/slaytActions";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const SlaytEkle = ({ setSlayt }) => {
  const [formData, setFormData] = useState({
    checked: true,
    resim: [],
  });
  let history = useHistory();
  const [anaSayfadaGosterilsinMi, setanaSayfadaGosterilsinMi] = useState(true);
  const [hata, setHata] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { resim } = formData;
  const onChange = (e) => {
    setHata(false);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      resim: e.target.files,
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
    if (resim.length === 0) {
      setHata(true);
      window.alert("Lütfen Resim Seçiniz");
      return;
    }
    let form_data = new FormData();
    form_data.append("anaSayfadaGosterilsinMi", anaSayfadaGosterilsinMi);
    for (const key of Object.keys(resim)) {
      form_data.append("resim", resim[key]);
    }

    setSlayt(form_data);
    history.push("/Slaytlar");
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
                        <span>Slayt Ekle</span>
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
                                      Gösterilsin Mi
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        type="checkbox"
                                        id="inputSuccess"
                                        name="anaSayfadaGosterilsinMi"
                                        onChange={(e) =>
                                          setanaSayfadaGosterilsinMi(
                                            !anaSayfadaGosterilsinMi
                                          )
                                        }
                                        checked={anaSayfadaGosterilsinMi}
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
                                              onChange={(e) => onChange(e)}
                                              type="file"
                                              multiple
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
                                      <Link to="/Slaytlar">
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
    </>
  );
};
SlaytEkle.propTypes = {
  setSlayt: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  setSlayt,
})(SlaytEkle);
