import React from "react";

const HowComponent = () => {
  return (
    <div className="homepage-section-layout" id="how">
      <h2>代購流程</h2>
      <div className="how-square homepage-content-layout">
        <div className="how-part">
          <div className="how-step1">
            <div className="how-num">1</div>
            <p>告知委託需求（可先使用估價系統）</p>
          </div>
          <div className="how-step2">
            <div className="how-num">2</div>
            <p>確認報價後先轉帳商品本體金額，確認入帳後會幫忙下單</p>
          </div>
        </div>
        <div className="how-part">
          <div className="how-step3">
            <div className="how-num">3</div>
            <p>預約商品到台後秤重、估算運費</p>
          </div>
          <div className="how-step4">
            <div className="how-num">4</div>
            <p>下單（或補款）尾款賣場，即可出貨</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowComponent;
