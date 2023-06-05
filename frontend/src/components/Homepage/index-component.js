import React from "react";
import { Link } from "react-router-dom";

const IndexComponent = () => {
  return (
    <div className="index">
      <div className="index-layout">
        <img src="../homepage.jpg" alt="首頁" />
        <div className="index-content-layout">
          <h1 className="d-lg-none">
            小浣熊
            <br />
            日本代購
          </h1>
          <h1 className="d-none d-lg-block">小浣熊日本代購</h1>
          <h2>Shopping with Raccoons</h2>
          <div className="index-btn">
            <Link to="https://www.plurk.com/raccoon36959" target="_blank">
              <button type="button" className="btn index-btn-plurk">
                Plurk
              </button>
            </Link>

            <Link to="https://www.facebook.com/raccoon36959" target="_blank">
              <button type="button" className="btn index-btn-fb">
                Facebook
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexComponent;
