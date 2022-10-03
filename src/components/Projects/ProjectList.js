import React, { Fragment, useEffect } from "react";
import { deleteProject, getProject } from "../../redux/actions/projectActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import Moment from "moment";
import Spinner from "../Spinner";
const ProjectList = ({
  getProject,
  deleteProject,
  project: { projects,loading },
  isAuthenticated,
}) => {
  useEffect(() => {
    getProject();

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return <Redirect to="/login" />;
    }
  }, [projects]);
  const onclickFunc = (isActive, id) => {
    deleteProject({ isActive, id });
  };
  return (
    <Fragment>
      <div className="portlet box green">
        <div className="portlet-title">
          <div className="caption">Projeler </div>
          <div class="tools">
            <Link to="/ProjeEkle" style={{ color: "white" }}>
              Proje Ekle
            </Link>
          </div>
        </div>
        <div className="portlet-body flip-scroll">
          <table className="table table-bordered table-striped table-condensed flip-content">
            <thead className="flip-content">
              <tr>
                <th width="15%"> Proje Adı </th>
                <th width="15%"> Adres </th>
                <th width="15%"> Metre Kare </th>
                <th width="15%"> Eklenme Tarihi </th>
                <th width="15%"> Kategori </th>
                <th width="15%"> Alt Kategori </th>
                <th> Düzenle </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <Spinner />
              ) : (
                projects.map((pro) =>
                  pro.isActive &&
                  //pro.altKategori !== null &&
                  pro.category.isActive /* &&
                  pro.altKategori.isActive */ ? (
                    <tr key={pro._id}>
                      <td> {pro.projectName} </td>
                      <td> {pro.address} </td>
                      <td> {pro.squareMeters} </td>
                      <td>{Moment(pro.date).format("DD-MM-YYYY")}</td>
                      <td> {pro.category.categoryName} </td>
                      <td> {pro.subCategory ==null ? '':pro.subCategory.subCategoryName} </td>
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            onclickFunc(false, pro._id);
                          }}
                          className="btn green"
                        >
                          Sil
                        </button>
                        <Link
                          to={{
                            pathname: "/ProjeGuncelle",
                            state: pro,
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
ProjectList.propTypes = {
  getProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  project: state.projectReducer,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProject, deleteProject })(ProjectList);
