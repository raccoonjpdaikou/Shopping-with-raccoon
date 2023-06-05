import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import IndexComponent from "../../components/Homepage/index-component";
import AnnounceComponent from "../../components/Homepage/announce-component";
import HowComponent from "../../components/Homepage/how-component";
import FeeComponent from "../../components/Homepage/fee-component";
import RuleComponent from "../../components/Homepage/rule-component";
import FaqComponent from "../../components/Homepage/faq-component";
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
      </div>
    </>
  );
};

export default Homepage;
