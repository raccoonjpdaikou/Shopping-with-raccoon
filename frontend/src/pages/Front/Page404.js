import React from "react";

const Page404 = () => {
  return (
    /* scss在others */
    <div className="section container page404-layout">
      <div className="d-flex align-items-center">
        <h2>找不到該網址</h2>
        <span className="cry-icon">இдஇ</span>
      </div>

      <div>
        <img src="../not_found.gif" alt="找不到該網址" />
      </div>
      <button className="btn btn-secondary btn-lg">← 返回首頁</button>
    </div>
  );
};

export default Page404;
