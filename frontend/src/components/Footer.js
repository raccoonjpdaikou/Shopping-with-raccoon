import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-layout d-flex flex-sm-row flex-column-reverse ">
      <div className="col-sm-5 col-12 footer-items-direction">
        <div className="footer-items">
          <p>公司名稱：小浣熊日本代購</p>
          <p>統編：92302707</p>
        </div>
      </div>
      <div className="col-sm-4  col-12 footer-items-direction">
        <div className="footer-items">
          <Link className="link-dark" to="https://www.plurk.com/raccoon36959">
            Plurk
          </Link>
          <Link
            className="link-dark"
            to="https://www.facebook.com/raccoon36959"
          >
            Facebook
          </Link>
        </div>
      </div>
      <div className="col-sm-3  col-12 footer-items-direction">
        <div className="footer-items">
          <Link className="link-dark" to="/servicepolicy">
            服務條款
          </Link>
          <Link className="link-dark" to="/privacy">
            隱私權政策
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
