import React, { Fragment, useEffect, useState } from "react";
import {
  getReferans,
  deleteReferans,
} from "../../redux/actions/referansActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Spinner from "../Spinner";
const ReferanList = ({
  getReferans,
  deleteReferans,
  referans: { ReferansList, loading },
}) => {
  useEffect(() => {
    getReferans();
    
  }, [ReferansList]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const onclickFunc = (aktifMi, id) => {
    deleteReferans({ aktifMi, id });
  };
  return (
    <Fragment>
      <div className="portlet box green">
        <div className="portlet-title">
          <div className="caption">Referanslar</div>
          <div class="tools">
            <Link style={{ color: "white" }} to="/ReferansEkle">
              Referans Ekle
            </Link>
          </div>
        </div>
        <div className="portlet-body flip-scroll">
          <table className="table table-bordered table-striped table-condensed flip-content">
            <thead className="flip-content">
              <tr>
                <th width="15%"> Firma Adı </th>
                <th width="15%"> Resim </th>

                <th> Düzenle </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <Spinner />
              ) : (
                ReferansList.map((ref, index) =>
                  ref.aktifMi ? (
                    <tr key={ref._id}>
                      <td> {ref.firmaAdi} </td>
                      <td>
                        <img
                          onClick={() => {
                            setIsOpen(true);
                            setPhotoIndex(index);
                          }}
                          className="img-preview-list"
                          src={ref.resim}
                          alt=""
                          key={ref.resim}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={(e) => {
                            onclickFunc(false, ref._id);
                          }}
                          className="btn green"
                        >
                          Sil
                        </button>
                        <Link
                          to={{
                            pathname: "/ReferansGuncelle",
                            state: ref,
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
          {isOpen && (
            <Lightbox
              mainSrc={ReferansList[photoIndex].resim}
              nextSrc={ReferansList[(photoIndex + 1) % ReferansList.length]}
              prevSrc={
                ReferansList[
                  (photoIndex + ReferansList.length - 1) % ReferansList.length
                ]
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() => {
               
                setPhotoIndex(
                  (photoIndex + ReferansList.length - 1) % ReferansList.length
                );
              }}
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % ReferansList.length)
              }
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
ReferanList.propTypes = {
  getReferans: PropTypes.func.isRequired,
  deleteReferans: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  referans: state.referansReducer,
});

export default connect(mapStateToProps, { getReferans, deleteReferans })(
  ReferanList
);
