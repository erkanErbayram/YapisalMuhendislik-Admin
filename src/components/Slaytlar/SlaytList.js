import React, { Fragment, useEffect, useState } from "react";
import { getSlayt, deleteSlayt } from "../../redux/actions/slaytActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const SlaytList = ({ getSlayt, deleteSlayt, slayt: { slaytlar } }) => {
  useEffect(() => {
    getSlayt();
  }, [slaytlar]);
  const onclickFunc = (aktifMi, id) => {
    deleteSlayt({ aktifMi, id });
  };
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  return (
    <Fragment>
      <div className="portlet box green">
        <div className="portlet-title">
          <div className="caption">Slaytlar </div>
          <div class="tools">
            <Link style={{ color: "white" }} to="/SlaytEkle">
              Slayt Ekle
            </Link>
          </div>
        </div>
        <div className="portlet-body flip-scroll">
          <table className="table table-bordered table-striped table-condensed flip-content">
            <thead className="flip-content">
              <tr>
                <th width="15%"> Gösterilsin Mi </th>
                <th width="75%"> Resimler </th>

                <th> Düzenle </th>
              </tr>
            </thead>

            <tbody>
              {slaytlar.map((slayt, index) =>
                slayt.aktifMi ? (
                  <tr key={slayt._id}>
                    <td>
                      {" "}
                      {slayt.anaSayfadaGosterilsinMi ? "Evet" : "Hayır"}{" "}
                    </td>
                    <td>
                      <img
                        onClick={() => {
                          setIsOpen(true);
                          setPhotoIndex(index);
                        }}
                        className="img-preview-list"
                        src={slayt.resim}
                        alt=""
                        key={slayt.resim}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          onclickFunc(false, slayt._id);
                        }}
                        className="btn green"
                      >
                        Sil
                      </button>
                      <Link
                        to={{
                          pathname: "/SlaytGuncelle",
                          state: slayt,
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
              )}
            </tbody>
          </table>
          {isOpen && (
            <Lightbox
              mainSrc={slaytlar[photoIndex].resim}
              nextSrc={slaytlar[(photoIndex + 1) % slaytlar.length]}
              prevSrc={
                slaytlar[(photoIndex + slaytlar.length - 1) % slaytlar.length]
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() => {
                setPhotoIndex(
                  (photoIndex + slaytlar.length - 1) % slaytlar.length
                );
              }}
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % slaytlar.length)
              }
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
SlaytList.propTypes = {
  getSlayt: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  slayt: state.slaytReducer,
});

export default connect(mapStateToProps, { getSlayt, deleteSlayt })(SlaytList);
