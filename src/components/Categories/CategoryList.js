import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getCategory,
  deleteCategory,
} from "../../redux/actions/categoryActions";
import Spinner from "../Spinner";
const CategoryList = ({
  getCategory,
  deleteCategory,
  category: { categories, loading },
}) => {
  useEffect(() => {
    getCategory();
  }, [categories]);
  const onclickFunc = (isActive, id) => {
    deleteCategory({ isActive, id });
  };
  return (
    <Fragment>
      <div className="portlet box green">
        <div className="portlet-title">
          <div className="caption">Kategoriler </div>
          <div class="tools">
            <Link to="/KategoriEkle" style={{ color: "white" }}>
              Kategori Ekle
            </Link>
          </div>
        </div>
        <div className="portlet-body flip-scroll">
          <table className="table table-bordered table-striped table-condensed flip-content">
            <thead className="flip-content">
              <tr>
                <th width="20%"> Kategori Adı </th>
                <th> Düzenle </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <Spinner />
              ) : (
                categories.map((category) =>
                  category.isActive ? (
                    <tr key={category._id}>
                      <td> {category.categoryName} </td>
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            onclickFunc(false, category._id);
                          }}
                          className="btn green"
                        >
                          Sil
                        </button>
                        <Link
                          to={{
                            pathname: "/KategoriGuncelle/",
                            state: category,
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
CategoryList.propTypes = {
  setCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getCategory, deleteCategory })(
  CategoryList
);
