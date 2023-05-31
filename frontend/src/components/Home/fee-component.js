import React from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const FeeComponent = () => {
  return (
    <div className="homepage-section-layout" id="fee">
      <h2>收費方式</h2>
      <div className="fee-content homepage-content-layout">
        <p>
          個人委託：商品日幣含稅價&thinsp;×&thinsp;（郵局告牌匯率+0.055）＋100元手續費
        </p>
        <p>
          空運國際運費（集運）：每100公克21元
          購買40元以上，未滿100公克以100公克計算
        </p>

        <p>
          <span className="fee-icon">
            <BsFillExclamationCircleFill color="#E0973E" />
          </span>
          香水代收：每瓶／件100元+轉運費80～150元（轉運費可與其他客人平分）
        </p>
        <p>
          <span className="fee-icon">
            <BsFillExclamationCircleFill color="#7d6c46" />
          </span>
          購買不可使用轉運倉址之商品，另收代收費：100～150元
        </p>
        <p>
          <span className="fee-icon">
            <BsFillExclamationCircleFill color="#7d6c46" />
          </span>
          未在時間內取貨遭退回，重新寄回：60元
        </p>
        <p>
          <span className="fee-icon">
            <BsFillExclamationCircleFill color="#E0973E" />
          </span>
          其他未明確標明收費之服務也會斟酌收費，會提前告知
        </p>
      </div>
    </div>
  );
};

export default FeeComponent;
