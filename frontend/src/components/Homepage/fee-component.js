import React from "react";
import { useSelector } from "react-redux";
import { BsFillExclamationCircleFill } from "react-icons/bs";

const FeeComponent = () => {
  const FeeDatas = useSelector((state) => {
    return state.fee;
  });
  return (
    <div className="homepage-section-layout" id="fee">
      <h2>收費方式</h2>
      <div className="fee-content homepage-content-layout">
        {FeeDatas.map((data, index) => (
          <p key={index}>
            <span className={`fee-icon ${!data.icon && "d-none"} `}>
              <BsFillExclamationCircleFill color={data.color} />
            </span>
            {data.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FeeComponent;
