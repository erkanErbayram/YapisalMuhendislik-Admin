import React, { Fragment, useEffect, useState } from "react";
import {
  getReference,
  deleteReference,
} from "../../redux/actions/referenceActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Spinner from "../Spinner";
const ReferenceList = ({
  getReference,
  deleteReference,
  reference: { referenceList, loading },
}) => {
  useEffect(() => {
    getReference();
    
  }, [referenceList]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const onclickFunc = (isActive, id) => {
    deleteReference({ isActive, id });
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
                referenceList.map((ref, index) =>
                  ref.isActive ? (
                    <tr key={ref._id}>
                      <td> {ref.companyName} </td>
                      <td>
                        <img
                          onClick={() => {
                            setIsOpen(true);
                            setPhotoIndex(index);
                          }}
                          className="img-preview-list"
                          src={ref.image}
                          alt=""
                          key={ref.image}
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
              mainSrc={referenceList[photoIndex].image}
              nextSrc={referenceList[(photoIndex + 1) % referenceList.length]}
              prevSrc={
                referenceList[
                  (photoIndex + referenceList.length - 1) % referenceList.length
                ]
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() => {
               
                setPhotoIndex(
                  (photoIndex + referenceList.length - 1) % referenceList.length
                );
              }}
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % referenceList.length)
              }
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
ReferenceList.propTypes = {
  getReference: PropTypes.func.isRequired,
  deleteReference: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  reference: state.referenceReducer,
});

export default connect(mapStateToProps, { getReference, deleteReference })(
  ReferenceList
);
