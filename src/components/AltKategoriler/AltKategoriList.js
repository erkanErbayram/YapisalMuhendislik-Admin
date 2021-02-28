import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  deleteAltKategori,
  getAltKategori,
} from "../../redux/actions/altKategoriActions";
import Spinner from "../Spinner";
const AltKategoriList = ({
  getAltKategori,
  deleteAltKategori,
  altKategori: { altKategoriler, loading },
}) => {
  useEffect(() => {
    getAltKategori();
  }, [altKategoriler]);
  const onclickFunc = (aktifMi, id) => {
    deleteAltKategori({ aktifMi, id });
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
                altKategoriler.map((altkategori) =>
                  altkategori.aktifMi && altkategori.kategori.aktifMi ? (
                    <tr key={altkategori._id}>
                      <td> {altkategori.altKategoriAdi} </td>
                      <td> {altkategori.kategori.kategoriAdi} </td>
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            onclickFunc(false, altkategori._id);
                          }}
                          className="btn green"
                        >
                          Sil
                        </button>
                        <Link
                          to={{
                            pathname: "/AltKategoriGuncelle",
                            state: altkategori,
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
AltKategoriList.propTypes = {
  getAltKategori: PropTypes.func.isRequired,

  deleteAltKategori: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  altKategori: state.altKategori,
});
export default connect(mapStateToProps, {
  getAltKategori,

  deleteAltKategori,
})(AltKategoriList);
