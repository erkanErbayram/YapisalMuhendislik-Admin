import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { putProje } from "../../redux/actions/projeActions";
import { getKategori } from "../../redux/actions/kategoriActions";
import { getAltKategoriWithKategori } from "../../redux/actions/altKategoriActions";
import Lightbox from "react-image-lightbox";
import ImageUploading from "react-images-uploading";
import "react-image-lightbox/style.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const ProjeGuncelle = ({
  location: { state },
  getKategori,
  kategori: { kategoriler },
  getAltKategoriWithKategori,
  altKategori: { altKategorilerWithKategori, loading },
  putProje,
}) => {
  let history = useHistory();

  const [kategoriIndex, setKategoriIndex] = useState(0);
  const [secilenKategoriIndex, setSecilenKategoriIndex] = useState(1);
  const [secilenAltKategoriIndex, setAltSecilenKategoriIndex] = useState(0);
  if (typeof state === "undefined") {
    history.push("/");
  }

  const [formData, setFormData] = useState({
    projeAdi: state == null ? "" : state.projeAdi,
    adres: state == null ? "" : state.adres,
    metreKare: state == null ? "" : state.metreKare,
    kategori: state == null ? "" : state.kategori._id,
    altKategori:
      typeof state.altKategori === "undefined" ||
      state.altKategori == null ||
      state == null
        ? ""
        : state.altKategori._id,
    aciklama: state == null ? "" : state.aciklama,
  });
  const [resim, setResim] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hata, setHata] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const maxNumber = 40;

  const {
    projeAdi,
    adres,
    metreKare,
    kategori,
    altKategori,
    aciklama,
  } = formData;
  useEffect(() => {
    if (typeof state === "undefined") {
      return history.push("/");
    }
    console.log(altKategorilerWithKategori);
    getKategori();
    getAltKategoriWithKategori(state.kategori._id);
    setImages(state.resim);
    setResim(state.resim);
  }, []);
  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit

    if (imageList.length === 0) {
      setHata(true);
    } else {
      setHata(false);
    }
    setImages(imageList);

    for (let index = 0; index < imageList.length; index++) {
      if (typeof imageList[index].file !== "undefined") {
        setResim((old) => [...old, imageList[index].file]);
      }
    }

    /*    imageList.forEach((im, index) =>
      resim.forEach((res) => {
        if (im === res) {
          finalArray.push(index);
        }
      })
    ); */
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let form_data = new FormData();
    if (hata) {
      window.alert("Lütfen Resim Seçiniz");
      return;
    }
    form_data.append("projeAdi", projeAdi);
    form_data.append("adres", adres);
    form_data.append("metreKare", metreKare);
    form_data.append("kategori", kategori);
    debugger;
    form_data.append(
      "altKategori",
      secilenAltKategoriIndex === 0 ? null : altKategori
    );

    form_data.append("aciklama", aciklama);

    for (let index = 0; index < resim.length; index++) {
      form_data.append("resim", resim[index]);
    }
    if (secilenKategoriIndex === 0) {
      return;
    }
    putProje(form_data, state._id);
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
                        <span>Proje Guncelle</span>
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
                                    Proje Guncelle
                                  </h3>
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
                                          loading = false;
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
                                              selected={
                                                kategori.kategoriAdi ===
                                                state.kategori.kategoriAdi
                                              }
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
                                  {typeof state.altKategori === "undefined" &&
                                  altKategorilerWithKategori.length === 0 ? (
                                    ""
                                  ) : (
                                    <div class="form-group">
                                      <label class="control-label col-md-3">
                                        Alt Kategori
                                      </label>
                                      <div class="col-md-4">
                                        <select
                                          //required={
                                          //   secilenAltKategoriIndex === 0
                                          //     ? true
                                          //      : false
                                          //  }
                                          class="form-control"
                                          name="altKategori"
                                          onChange={(e) => {
                                            onChange(e);
                                            setAltSecilenKategoriIndex(
                                              e.target.selectedIndex
                                            );
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
                                                    selected={
                                                      typeof state.altKategori ===
                                                        "undefined" ||
                                                      state.altKategori == null
                                                        ? false
                                                        : state.altKategori
                                                            .altKategoriAdi ==
                                                          altKategori1.altKategoriAdi
                                                    }
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
                                                &nbsp;
                                                {/* <button
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
                                                      {typeof image[
                                                        "data_url"
                                                      ] !== "undefined" ? (
                                                        <div>
                                                          <img
                                                            onClick={() => {
                                                              setIsOpen(true);

                                                              setPhotoIndex(
                                                                index
                                                              );
                                                            }}
                                                            src={
                                                              image["data_url"]
                                                            }
                                                            alt=""
                                                            width="100"
                                                          />
                                                          <div className="image-item__btn-wrapper">
                                                            <button
                                                              onClick={() => {
                                                                onImageRemove(
                                                                  index
                                                                );
                                                              }}
                                                              className="btn green"
                                                              type="button"
                                                            >
                                                              Sil
                                                            </button>
                                                          </div>
                                                        </div>
                                                      ) : (
                                                        <div>
                                                          <img
                                                            onClick={() => {
                                                              setIsOpen(true);

                                                              setPhotoIndex(
                                                                index
                                                              );
                                                            }}
                                                            src={image}
                                                            alt=""
                                                            width="100"
                                                          />
                                                          <div className="image-item__btn-wrapper">
                                                            <button
                                                              onClick={() => {
                                                                onImageRemove(
                                                                  index
                                                                );
                                                                resim.splice(
                                                                  index,
                                                                  1
                                                                );
                                                              }}
                                                              className="btn green"
                                                              type="button"
                                                            >
                                                              Sil
                                                            </button>
                                                          </div>
                                                        </div>
                                                      )}
                                                    </div>
                                                  )
                                                )}
                                                {isOpen && (
                                                  <Lightbox
                                                    mainSrc={
                                                      typeof images[photoIndex]
                                                        .data_url ===
                                                      "undefined"
                                                        ? resim[photoIndex]
                                                        : images[photoIndex]
                                                            .data_url
                                                    }
                                                    nextSrc={
                                                      resim[
                                                        (photoIndex + 1) %
                                                          resim.length
                                                      ]
                                                    }
                                                    prevSrc={
                                                      resim[
                                                        (photoIndex +
                                                          resim.length -
                                                          1) %
                                                          resim.length
                                                      ]
                                                    }
                                                    onCloseRequest={() =>
                                                      setIsOpen(false)
                                                    }
                                                    onMovePrevRequest={() =>
                                                      setPhotoIndex(
                                                        (photoIndex +
                                                          resim.length -
                                                          1) %
                                                          resim.length
                                                      )
                                                    }
                                                    onMoveNextRequest={() =>
                                                      setPhotoIndex(
                                                        (photoIndex + 1) %
                                                          resim.length
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

              <a href="javascript:;" className="page-quick-sidebar-toggler">
                <i className="icon-login" />
              </a>
              <div
                className="page-quick-sidebar-wrapper"
                data-close-on-body-click="false"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ProjeGuncelle.propTypes = {
  putProje: PropTypes.func.isRequired,
  getAltKategoriWithKategori: PropTypes.func.isRequired,
  getKategori: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  kategori: state.kategori,
  altKategori: state.altKategori,
});
export default connect(mapStateToProps, {
  putProje,
  getKategori,
  getAltKategoriWithKategori,
})(ProjeGuncelle);
