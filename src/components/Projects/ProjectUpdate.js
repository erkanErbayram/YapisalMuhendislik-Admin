import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProject } from "../../redux/actions/projectActions";
import { getCategory } from "../../redux/actions/categoryActions";
import { getSubCategoryWithCategory } from "../../redux/actions/subCategoryActions";
import Lightbox from "react-image-lightbox";
import ImageUploading from "react-images-uploading";
import "react-image-lightbox/style.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const ProjectUpdate = ({
  location: { state },
  getCategory,
  category: { categories },
  getSubCategoryWithCategory,
  subCategory: { subCategoryWithCategory, loading },
  updateProject,
}) => {
  let history = useHistory();

  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(1);
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);
  if (typeof state === "undefined") {
    history.push("/");
  }

  const [formData, setFormData] = useState({
    projectName: state == null ? "" : state.projectName,
    address: state == null ? "" : state.address,
    squareMeters: state == null ? "" : state.squareMeters,
    category: state == null ? "" : state.category._id,
    subCategory:
      typeof state.subCategory === "undefined" ||
      state.subCategory == null ||
      state == null
        ? ""
        : state.subCategory._id,
    description: state == null ? "" : state.description,
  });
  const [image, setImage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const maxNumber = 40;

  const {
    projectName,
    address,
    squareMeters,
    category,
    subCategory,
    description,
  } = formData;
  useEffect(() => {
    if (typeof state === "undefined") {
      return history.push("/");
    }
    getCategory();
    getSubCategoryWithCategory(state.category._id);
    setImages(state.image);
    setImage(state.image);
  }, []);
  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit

    if (imageList.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
    setImages(imageList);

    for (let index = 0; index < imageList.length; index++) {
      if (typeof imageList[index].file !== "undefined") {
        setImage((old) => [...old, imageList[index].file]);
      }
    }
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
    if (error) {
      window.alert("Lütfen Resim Seçiniz");
      return;
    }
    form_data.append("projectName", projectName);
    form_data.append("address", address);
    form_data.append("squareMeters", squareMeters);
    form_data.append("category", category);
    form_data.append(
      "subCategory",
      selectedSubCategoryIndex === 0 ? null : subCategory
    );

    form_data.append("description", description);

    for (let index = 0; index < image.length; index++) {
      form_data.append("image", image[index]);
    }
    if (selectedCategoryIndex === 0) {
      return;
    }
    updateProject(form_data, state._id);
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
                                        name="projectName"
                                        onChange={(e) => onChange(e)}
                                        value={projectName}
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
                                        name="address"
                                        onChange={(e) => onChange(e)}
                                        value={address}
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
                                        name="squareMeters"
                                        onChange={(e) => onChange(e)}
                                        value={squareMeters}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div className="form-group ">
                                    <label
                                      className="control-label col-md-3"
                                      htmlFor="inputSuccess"
                                    >
                                      description
                                    </label>
                                    <div className="col-md-4">
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="inputSuccess"
                                        name="description"
                                        onChange={(e) => onChange(e)}
                                        value={description}
                                      />{" "}
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label class="control-label col-md-3">
                                      Kategori
                                    </label>
                                    <div class="col-md-4">
                                      <select
                                        name="category"
                                        onChange={async (e) => {
                                          if (e.target.selectedIndex === 0) {
                                            setCategoryIndex(0);
                                          } else {
                                            setCategoryIndex(1);
                                          }
                                          setSelectedCategoryIndex(
                                            e.target.selectedIndex
                                          );
                                          getSubCategoryWithCategory(
                                            e.target.value
                                          );
                                          onChange(e);
                                          loading = false;
                                        }}
                                        required={
                                          selectedCategoryIndex === 0
                                            ? true
                                            : false
                                        }
                                        class="form-control"
                                      >
                                        <option value="">
                                          Kategori Seçiniz
                                        </option>
                                        {categories.map((category, index) =>
                                          category.isActive ? (
                                            <option
                                              key={index}
                                              value={category._id}
                                              selected={
                                                category.categoryName ===
                                                state.category.categoryName
                                              }
                                            >
                                              {category.categoryName}
                                            </option>
                                          ) : (
                                            ""
                                          )
                                        )}
                                      </select>
                                    </div>
                                  </div>
                                  {typeof state.subCategory === "undefined" &&
                                  subCategoryWithCategory.length === 0 ? (
                                    ""
                                  ) : (
                                    <div class="form-group">
                                      <label class="control-label col-md-3">
                                        Alt Kategori
                                      </label>
                                      <div class="col-md-4">
                                        <select
                                          class="form-control"
                                          name="subCategory"
                                          onChange={(e) => {
                                            onChange(e);
                                            setSelectedSubCategoryIndex(
                                              e.target.selectedIndex
                                            );
                                          }}
                                        >
                                          <option value="">
                                            Alt Kategori Seçiniz
                                          </option>

                                          {subCategoryWithCategory &&
                                            subCategoryWithCategory.map(
                                              (subCategory1, index) =>
                                                subCategory1.aktifMi ? (
                                                  <option
                                                    key={index}
                                                    value={subCategory1._id}
                                                    selected={
                                                      typeof state.subCategory ===
                                                        "undefined" ||
                                                      state.subCategory == null
                                                        ? false
                                                        : state.subCategory
                                                            .subCategoryName ==
                                                          subCategory1.subCategoryName
                                                    }
                                                  >
                                                    {
                                                      subCategory1.subCategoryName
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
                                                                image.splice(
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
                                                        ? image[photoIndex]
                                                        : images[photoIndex]
                                                            .data_url
                                                    }
                                                    nextSrc={
                                                      image[
                                                        (photoIndex + 1) %
                                                          image.length
                                                      ]
                                                    }
                                                    prevSrc={
                                                      image[
                                                        (photoIndex +
                                                          image.length -
                                                          1) %
                                                          image.length
                                                      ]
                                                    }
                                                    onCloseRequest={() =>
                                                      setIsOpen(false)
                                                    }
                                                    onMovePrevRequest={() =>
                                                      setPhotoIndex(
                                                        (photoIndex +
                                                          image.length -
                                                          1) %
                                                          image.length
                                                      )
                                                    }
                                                    onMoveNextRequest={() =>
                                                      setPhotoIndex(
                                                        (photoIndex + 1) %
                                                          image.length
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
ProjectUpdate.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getSubCategoryWithCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
  subCategory: state.subCategory,
});
export default connect(mapStateToProps, {
  updateProject,
  getCategory,
  getSubCategoryWithCategory,
})(ProjectUpdate);
