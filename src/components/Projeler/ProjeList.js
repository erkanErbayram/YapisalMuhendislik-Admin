import React, { Fragment, useEffect } from "react";
import { deleteProje, getProje } from "../../redux/actions/projeActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import Moment from "moment";
import Spinner from "../Spinner";
const ProjeList = ({
  getProje,
  deleteProje,
  proje: { projeler,loading },
  isAuthenticated,
}) => {
  useEffect(() => {
    getProje();

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return <Redirect to="/login" />;
    }
  }, [projeler]);
  const onclickFunc = (aktifMi, id) => {
    deleteProje({ aktifMi, id });
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
                projeler.map((pro) =>
                  pro.aktifMi &&
                  //pro.altKategori !== null &&
                  pro.kategori.aktifMi /* &&
                  pro.altKategori.aktifMi */ ? (
                    <tr key={pro._id}>
                      <td> {pro.projeAdi} </td>
                      <td> {pro.adres} </td>
                      <td> {pro.metreKare} </td>
                      <td>{Moment(pro.eklenmeTarihi).format("DD-MM-YYYY")}</td>
                      <td> {pro.kategori.kategoriAdi} </td>
                      <td> {pro.altKategori ==null ? '':pro.altKategori.altKategoriAdi} </td>
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
ProjeList.propTypes = {
  getProje: PropTypes.func.isRequired,
  deleteProje: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  proje: state.projeReducer,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getProje, deleteProje })(ProjeList);
