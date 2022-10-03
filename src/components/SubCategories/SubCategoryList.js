import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  deleteSubCategory,
  getSubCategory,
} from "../../redux/actions/subCategoryActions";
import Spinner from "../Spinner";
const SubCategoryList = ({
  getSubCategory,
  deleteSubCategory,
  subCategory: { subCategories, loading },
}) => {
  useEffect(() => {
    getSubCategory();
  }, [subCategories]);
  const onclickFunc = (isActive, id) => {
    deleteSubCategory({ isActive, id });
  };
  return (
    <Fragment>
      <div className="portlet box green">
        <div className="portlet-title">
          <div className="caption">Alt Kategoriler </div>
          <div class="tools">
            <Link to="/AltKategoriEkle" style={{ color: "white" }}>
              Alt Kategori Ekle
            </Link>
          </div>
        </div>
        <div className="portlet-body flip-scroll">
          <table className="table table-bordered table-striped table-condensed flip-content">
            <thead className="flip-content">
              <tr>
                <th width="20%"> Alt Kategori Adı </th>
                <th width="20%"> Kategori Adı </th>
                <th> Düzenle </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <Spinner  />
              ) : (
                subCategories.map((subCategory) =>
                  subCategory.isActive && subCategory.category.isActive ? (
                    <tr key={subCategory._id}>
                      <td> {subCategory.subCategoryName} </td>
                      <td> {subCategory.category.categoryName} </td>
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            onclickFunc(false, subCategory._id);
                          }}
                          className="btn green"
                        >
                          Sil
                        </button>
                        <Link
                          to={{
                            pathname: "/AltKategoriGuncelle",
                            state: subCategory,
                          }}
                          className="btn green"
                        >
                          Güncelle
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
SubCategoryList.propTypes = {
  getSubCategory: PropTypes.func.isRequired,
  deleteSubCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  subCategory: state.subCategory,
});
export default connect(mapStateToProps, {
  getSubCategory,

  deleteSubCategory,
})(SubCategoryList);
