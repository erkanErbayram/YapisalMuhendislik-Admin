import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  getKategori,
  deleteKategori,
} from "../../redux/actions/kategoriActions";
import Spinner from "../Spinner";
const KategoriList = ({
  getKategori,
  deleteKategori,
  kategori: { kategoriler, loading },
}) => {
  //const kategori1 = useSelector(state => state.kategori)
  /* const mapStateToProps = (state) => ({
  kategori: state.kategori,
});
 */
  
  useEffect(() => {
    getKategori();
  }, [kategoriler]);
  const onclickFunc = (aktifMi, id) => {
    deleteKategori({ aktifMi, id });
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
                kategoriler.map((kategori) =>
                  kategori.aktifMi ? (
                    <tr key={kategori._id}>
                      <td> {kategori.kategoriAdi} </td>
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            onclickFunc(false, kategori._id);
                          }}
                          className="btn green"
                        >
                          Sil
                        </button>
                        <Link
                          to={{
                            pathname: "/KategoriGuncelle/",
                            state: kategori,
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
KategoriList.propTypes = {
  setKategori: PropTypes.func.isRequired,
  deleteKategori: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  kategori: state.kategori,
});

export default connect(mapStateToProps, { getKategori, deleteKategori })(
  KategoriList
);
