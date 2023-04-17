import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomepageComponent from "../../components/Home/homepage-component";
import AnnounceComponent from "../../components/Home/announce-component";

const Homepage = () => {
  return (
    <>
      <div className="container bg-white index-page">
        <div className="section">
          <h1>待更新</h1>
          <ol>
            <li>訂單查詢頁面</li>
            <li>首頁</li>
            <li>ipad的navbar</li>
            <li>加一個scroll to top(SPA的緣故)</li>
            <li>只有rate會500</li>
          </ol>
          <h1>有空再處理</h1>
          <ol>
            <li>後台的sidebar跟navbar(active功能)</li>
            <li>前後台的公告+後台的留言 要改翻頁模式</li>
            <li>電腦板首頁加一個回到頂部的功能</li>
          </ol>
          <h1>已知bug</h1>
          <ol>
            <li>後台留言編輯過後會回到沒篩選過後的樣子(即全部類別)</li>
            <li>公告跟留言編輯過後不存檔打開不會重置</li>
          </ol>
          <Link
            className="d-flex align-items-center justify-content-end p-3 "
            to="admin/rate"
          >
            管理員登入
          </Link>
        </div>
        <AnnounceComponent />
        {/*<HomepageComponent />
        <h5>服務條款</h5>
        <h5>隱私權政策</h5> */}
      </div>
    </>
  );
};

export default Homepage;
