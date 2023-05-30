import React from "react";
import { Bs1Circle, Bs2Circle, Bs3Circle, Bs4Circle } from "react-icons/bs";

const HowComponent = () => {
  return (
    <div className="homepage-section-layout" id="how">
      <h2>代購流程</h2>
      <div className="how-square">
        <div className="how-step1">
          <p>
            <div className="how-icon">
              <Bs1Circle />
            </div>
            告知委託需求（可先使用估價系統）
          </p>
        </div>
        <div className="how-step2">
          <p>
            <div className="how-icon">
              <Bs2Circle />
            </div>
            確認報價後先轉帳商品本體金額，確認入帳後會幫忙下單
          </p>
        </div>
        <div className="how-step3">
          <p>
            <div className="how-icon">
              <Bs3Circle />
            </div>
            預約商品到台後秤重、估算運費
          </p>
        </div>
        <div className="how-step4">
          <p>
            <div className="how-icon">
              <Bs4Circle />
            </div>
            下單（或補款）尾款賣場，即可出貨
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowComponent;
