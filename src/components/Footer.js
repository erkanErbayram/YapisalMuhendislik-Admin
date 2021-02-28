import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        height: "22%",
        bottom: 0,
        left: 0,
        width: "100%",
      }}
    >
      <div className="page-wrapper-row">
        <div className="page-wrapper-bottom">
          {/* BEGIN FOOTER */}
          {/* BEGIN PRE-FOOTER */}
          <div className="page-prefooter">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12 footer-block">
                  <h2>About</h2>
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam dolore.{" "}
                  </p>
                </div>
                <div className="col-md-3 col-sm-6 col-xs-12 footer-block">
                  <h2>Contacts</h2>
                  <address className="margin-bottom-40">
                    {" "}
                    Phone: 800 123 3456
                    <br /> Email:
                    <a href="mailto:info@metronic.com">info@metronic.com</a>
                  </address>
                </div>
              </div>
            </div>
          </div>
          {/* END PRE-FOOTER */}
          {/* BEGIN INNER FOOTER */}
          <div className="page-footer">
            <div className="container">
              {" "}
              2016 © Metronic Theme By
              <a target="_blank" href="http://keenthemes.com">
                Keenthemes
              </a>{" "}
              &nbsp;|&nbsp;
              <a
                href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes"
                title="Purchase Metronic just for 27$ and get lifetime updates for free"
                target="_blank"
              >
                Purchase Metronic!
              </a>
            </div>
          </div>
          <div className="scroll-to-top">
            <i className="icon-arrow-up" />
          </div>
          {/* END INNER FOOTER */}
          {/* END FOOTER */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
