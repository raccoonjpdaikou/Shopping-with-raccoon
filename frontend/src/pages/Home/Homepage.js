import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import IndexComponent from "../../components/Home/index-component";
import AnnounceComponent from "../../components/Home/announce-component";
import HowComponent from "../../components/Home/how-component";
import FeeComponent from "../../components/Home/fee-component";
import RuleComponent from "../../components/Home/rule-component";
import FaqComponent from "../../components/Home/faq-component";
import Footer from "../../components/Footer";

const Homepage = () => {
  const info = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 获取页面滚动的垂直高度
      const scrollHeight =
        window.pageYOffset || document.documentElement.scrollTop;
      // 指定滚动高度阈值
      const threshold = 200; // 设置为您想要的滚动高度阈值
      // 根据滚动高度来更新导航栏显示状态
      setShowNavbar(scrollHeight > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    // 清除滚动事件监听器
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <IndexComponent />
      <div className={`index-navbar ${!showNavbar && "d-none"}`}>
        <Navbar info={info.pathname === "/"} />
      </div>
      <div className="container">
        <AnnounceComponent />
        <HowComponent />
        <FeeComponent />
        <RuleComponent />
        <FaqComponent />
        <div className={`bg-primary py-2 ${!showNavbar && "d-none"}`}>
          <Footer />
        </div>

        {/* <div className="section">
           <h1>待更新</h1>
          <ol>
            <li>首頁</li>
            <li>登入頁面rwd</li>
            <li>dashbord的navbar</li>
            <li>ipad的navbar</li>
            <li>加一個scroll to top(SPA的緣故)</li>
            <li>註冊密碼需要先check</li>
            SCROLL的電腦版樣式
            到估價訂單流岩板 active btn color
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
        </div> */}
      </div>
    </>
  );
};

export default Homepage;
