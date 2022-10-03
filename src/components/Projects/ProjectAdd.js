import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setProject } from "../../redux/actions/projectActions";
import { getCategory } from "../../redux/actions/categoryActions";
import { getSubCategoryWithCategory } from "../../redux/actions/subCategoryActions";
import { Link, useHistory } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import Lightbox from "react-image-lightbox";
import Spinner from "../Spinner";
import "react-image-lightbox/style.css";
const ProjectAdd = ({
  getCategory,
  category: { categories },
  getSubCategoryWithCategory,
  subCategory: { subCategoryWithCategory, loading },
  setProject,
}) => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);
  const [formData, setFormData] = useState({
    projectName: "",
    address: "",
    squareMeters: "",
    category: "",
    subCategory: "",
    description: "",
  });

  const [image, setImage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const maxNumber = 40;
  let history = useHistory();
  const {
    projectName,
    address,
    squareMeters,
    category,
    subCategory,
    description,
  } = formData;
  useEffect(() => {
    getCategory();
  }, [categories, subCategoryWithCategory]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeImage = (imageList, addUpdateIndex) => {
    if (imageList.length === 0) {
      setImage([]);
    }
    if (imageList.length !== image.length) {
      setImage([]);
    }
    // data for submit

    setImages(imageList);
    for (let index = 0; index < imageList.length; index++) {
      setImage((old) => [...old, imageList[index].file]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (image.length === 0) {
      setError(true);
      window.alert("Lütfen Resim Seçiniz");
      return;
    }

    let form_data = new FormData();
    form_data.append("projectName", projectName);
    form_data.append("address", address);
    form_data.append("squareMeters", squareMeters);
    form_data.append("category", category);
    if (subCategory.length !== 0) {
      form_data.append("subCategory", subCategory);
    }

    form_data.append("description", description);
    for (let index = 0; index < image.length; index++) {
      form_data.append("image", image[index]);
    }

    if (selectedCategoryIndex === 0) {
      return;
    }
    debugger;
    setProject(form_data);
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
                                  {subCategoryWithCategory.length === 0 ||
                                  loading ||
                                  categoryIndex === 0 ? (
                                    ""
                                  ) : (
                                    <div class="form-group">
                                      <label class="control-label col-md-3">
                                        Alt Kategori
                                      </label>
                                      <div class="col-md-4">
                                        <select
                                          // required={
                                          //selectedSubCategoryIndex === 0
                                          //? true
                                          //: false
                                          //}
                                          class="form-control"
                                          name="subCategory"
                                          onChange={(e) => {
                                            setSelectedSubCategoryIndex(
                                              e.target.selectedIndex
                                            );
                                            onChange(e);
                                          }}
                                        >
                                          <option value="">
                                            Alt Kategori Seçiniz
                                          </option>

                                          {subCategoryWithCategory &&
                                            subCategoryWithCategory.map(
                                              (subCategory, index) =>
                                                subCategory.isActive ? (
                                                  <option
                                                    key={index}
                                                    value={subCategory._id}
                                                  >
                                                    {
                                                      subCategory.subCategoryName
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
ProjectAdd.propTypes = {
  setProject: PropTypes.func.isRequired,
  getSubCategoryWithCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
  subCategory: state.subCategory,
});
export default connect(mapStateToProps, {
  setProject,
  getCategory,
  getSubCategoryWithCategory,
})(ProjectAdd);
