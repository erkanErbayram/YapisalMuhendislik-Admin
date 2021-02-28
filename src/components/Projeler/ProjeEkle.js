import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setProje } from "../../redux/actions/projeActions";
import { getKategori } from "../../redux/actions/kategoriActions";
import { getAltKategoriWithKategori } from "../../redux/actions/altKategoriActions";
import { Link, useHistory } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import Lightbox from "react-image-lightbox";
import Spinner from "../Spinner";
import "react-image-lightbox/style.css";
const ProjeEkle = ({
  getKategori,
  kategori: { kategoriler },
  getAltKategoriWithKategori,
  altKategori: { altKategorilerWithKategori, loading },
  setProje,
}) => {
  const [kategoriIndex, setKategoriIndex] = useState(0);
  const [secilenKategoriIndex, setSecilenKategoriIndex] = useState(0);
  const [secilenAltKategoriIndex, setAltSecilenKategoriIndex] = useState(0);
  const [formData, setFormData] = useState({
    projeAdi: "",
    adres: "",
    metreKare: "",
    kategori: "",
    altKategori: "",
    aciklama: "",
  });

  const [resim, setResim] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  // eslint-disable-next-line
  const [hata, setHata] = useState(false);
  const maxNumber = 40;
  let history = useHistory();
  const {
    projeAdi,
    adres,
    metreKare,
    kategori,
    altKategori,
    aciklama,
  } = formData;
  useEffect(() => {
    getKategori();
  }, [kategoriler, altKategorilerWithKategori]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeImage = (imageList, addUpdateIndex) => {
    if (imageList.length === 0) {
      setResim([]);
    }
    if (imageList.length !== resim.length) {
      setResim([]);
    }
    // data for submit

    setImages(imageList);
    for (let index = 0; index < imageList.length; index++) {
      setResim((old) => [...old, imageList[index].file]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (resim.length === 0) {
      setHata(true);
      window.alert("Lütfen Resim Seçiniz");
      return;
    }

    let form_data = new FormData();
    form_data.append("projeAdi", projeAdi);
    form_data.append("adres", adres);
    form_data.append("metreKare", metreKare);
    form_data.append("kategori", kategori);
    if (altKategori.length !== 0) {
      form_data.append("altKategori", altKategori);
    }

    form_data.append("aciklama", aciklama);
    for (let index = 0; index < resim.length; index++) {
      form_data.append("resim", resim[index]);
    }

    if (secilenKategoriIndex === 0) {
      return;
    }
    debugger;
    setProje(form_data);
    history.push("/");
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
                        <span>Proje Ekle</span>
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
                                  <h3 className="form-section">Proje Ekle</h3>
                                  <div className="form-group ">
                                    <label
                                      className="control-label col-md-3"
                                      htmlFor="inputSuccess"
                                    >
                                      Proje Adı
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="projeAdi"
                                        onChange={(e) => onChange(e)}
                                        value={projeAdi}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="form-group ">
                                    <label
                                      className="control-label col-md-3"
                                      htmlFor="inputSuccess"
                                    >
                                      Adres
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="adres"
                                        onChange={(e) => onChange(e)}
                                        value={adres}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="form-group ">
                                    <label
                                      className="control-label col-md-3"
                                      htmlFor="inputSuccess"
                                    >
                                      Metre Kare
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="metreKare"
                                        onChange={(e) => onChange(e)}
                                        value={metreKare}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="form-group ">
                                    <label
                                      className="control-label col-md-3"
                                      htmlFor="inputSuccess"
                                    >
                                      Aciklama
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="aciklama"
                                        onChange={(e) => onChange(e)}
                                        value={aciklama}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="control-label col-md-3">
                                      Kategori
                                    </label>
                                    <div class="col-md-4">
                                      <select
                                        name="kategori"
                                        onChange={async (e) => {
                                          if (e.target.selectedIndex === 0) {
                                            setKategoriIndex(0);
                                          } else {
                                            setKategoriIndex(1);
                                          }
                                          setSecilenKategoriIndex(
                                            e.target.selectedIndex
                                          );
                                          getAltKategoriWithKategori(
                                            e.target.value
                                          );
                                          onChange(e);
                                        }}
                                        required={
                                          secilenKategoriIndex === 0
                                            ? true
                                            : false
                                        }
                                        class="form-control"
                                      >
                                        <option value="">
                                          Kategori Seçiniz
                                        </option>
                                        {kategoriler.map((kategori, index) =>
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
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                  {altKategorilerWithKategori.length === 0 ||
                                  loading ||
                                  kategoriIndex === 0 ? (
                                    ""
                                  ) : (
                                    <div class="form-group">
                                      <label class="control-label col-md-3">
                                        Alt Kategori
                                      </label>
                                      <div class="col-md-4">
                                        <select
                                          // required={
                                          //secilenAltKategoriIndex === 0
                                          //? true
                                          //: false
                                          //}
                                          class="form-control"
                                          name="altKategori"
                                          onChange={(e) => {
                                            setAltSecilenKategoriIndex(
                                              e.target.selectedIndex
                                            );
                                            onChange(e);
                                          }}
                                        >
                                          <option value="">
                                            Alt Kategori Seçiniz
                                          </option>

                                          {altKategorilerWithKategori &&
                                            altKategorilerWithKategori.map(
                                              (altKategori1, index) =>
                                                altKategori1.aktifMi ? (
                                                  <option
                                                    key={index}
                                                    value={altKategori1._id}
                                                  >
                                                    {
                                                      altKategori1.altKategoriAdi
                                                    }
                                                  </option>
                                                ) : (
                                                  ""
                                                )
                                            )}
                                        </select>
                                      </div>
                                    </div>
                                  )}
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
                                          <ImageUploading
                                            multiple
                                            value={images}
                                            onChange={onChangeImage}
                                            maxNumber={maxNumber}
                                            dataURLKey="data_url"
                                          >
                                            {({
                                              imageList,
                                              onImageUpload,
                                              onImageRemoveAll,
                                              onImageUpdate,
                                              onImageRemove,
                                              isDragging,
                                              dragProps,
                                            }) => (
                                              // write your building UI
                                              <div className="upload__image-wrapper">
                                                <button
                                                  style={
                                                    isDragging
                                                      ? { color: "red" }
                                                      : undefined
                                                  }
                                                  type="button"
                                                  className="btn green"
                                                  onClick={onImageUpload}
                                                  {...dragProps}
                                                >
                                                  Resim Ekle
                                                </button>
                                                <div
                                                  style={{ marginTop: "10" }}
                                                ></div>
                                                &nbsp;
                                                {/*  <button
                                                  onClick={onImageRemoveAll}
                                                  className="btn green"
                                                  type="button"
                                                >
                                                  Tüm Resimleri Sil
                                                </button> */}
                                                {imageList.map(
                                                  (image, index) => (
                                                    <div
                                                      key={index}
                                                      className="image-item"
                                                    >
                                                      <img
                                                        onClick={() => {
                                                          setIsOpen(true);

                                                          setPhotoIndex(index);
                                                        }}
                                                        src={image["data_url"]}
                                                        alt=""
                                                        width="100"
                                                      />
                                                      <div className="image-item__btn-wrapper">
                                                        <button
                                                          onClick={() =>
                                                            onImageRemove(index)
                                                          }
                                                          className="btn green"
                                                          type="button"
                                                        >
                                                          Sil
                                                        </button>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                                {isOpen && (
                                                  <Lightbox
                                                    mainSrc={
                                                      images[photoIndex]
                                                        .data_url
                                                    }
                                                    nextSrc={
                                                      images[
                                                        (photoIndex + 1) %
                                                          images.length
                                                      ].data_url
                                                    }
                                                    prevSrc={
                                                      images[
                                                        (photoIndex +
                                                          images.length -
                                                          1) %
                                                          images.length
                                                      ].data_url
                                                    }
                                                    onCloseRequest={() =>
                                                      setIsOpen(false)
                                                    }
                                                    onMovePrevRequest={() =>
                                                      setPhotoIndex(
                                                        (photoIndex +
                                                          images.length -
                                                          1) %
                                                          images.length
                                                      )
                                                    }
                                                    onMoveNextRequest={() =>
                                                      setPhotoIndex(
                                                        (photoIndex + 1) %
                                                          images.length
                                                      )
                                                    }
                                                  />
                                                )}
                                              </div>
                                            )}
                                          </ImageUploading>
                                        </div>
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
                                      <Link to="/">
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
              {/* 
              <a href="javascript:;" className="page-quick-sidebar-toggler">
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
ProjeEkle.propTypes = {
  setProje: PropTypes.func.isRequired,
  getAltKategoriWithKategori: PropTypes.func.isRequired,
  getKategori: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  kategori: state.kategori,
  altKategori: state.altKategori,
});
export default connect(mapStateToProps, {
  setProje,
  getKategori,
  getAltKategoriWithKategori,
})(ProjeEkle);
