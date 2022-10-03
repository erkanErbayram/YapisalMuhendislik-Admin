import React, { Fragment, useEffect, useState } from "react";
import { getSlide, deleteSlide } from "../../redux/actions/slideActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const SlideList = ({ getSlide, deleteSlide, slide: { slides } }) => {
  useEffect(() => {
    getSlide();
  }, [slides]);
  const onclickFunc = (isActive, id) => {
    deleteSlide({ isActive, id });
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
              {slides.map((slide, index) =>
                slide.isActive ? (
                  <tr key={slide._id}>
                    <td>
                      {slide.showMainPage ? "Evet" : "Hayır"}{" "}
                    </td>
                    <td>
                      <img
                        onClick={() => {
                          setIsOpen(true);
                          setPhotoIndex(index);
                        }}
                        className="img-preview-list"
                        src={slide.image}
                        alt=""
                        key={slide.image}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          onclickFunc(false, slide._id);
                        }}
                        className="btn green"
                      >
                        Sil
                      </button>
                      <Link
                        to={{
                          pathname: "/SlaytGuncelle",
                          state: slide,
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
              mainSrc={slides[photoIndex].image}
              nextSrc={slides[(photoIndex + 1) % slides.length]}
              prevSrc={
                slides[(photoIndex + slides.length - 1) % slides.length]
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() => {
                setPhotoIndex(
                  (photoIndex + slides.length - 1) % slides.length
                );
              }}
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % slides.length)
              }
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
SlideList.propTypes = {
  getSlide: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  slide: state.slideReducer,
});

export default connect(mapStateToProps, { getSlide, deleteSlide })(SlideList);
