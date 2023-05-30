import React, { useState, useEffect } from "react";
import CollapseCardComponent from "../../components/CollapseCard-component";
import GuestService from "../../services/guest.service";

const AnnounceComponent = () => {
  const [infos, setInfos] = useState();

  const getInfo = () => {
    GuestService.info()
      .then((data) => {
        setInfos(data.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  useEffect(() => {
    getInfo();
  }, [setInfos]);

  return (
    <div className="homepage-section-layout" id="announcements">
      <h2>最新消息</h2>
      <div className="announce-content-layout border">
        {infos !== undefined &&
          infos
            .slice(0)
            .reverse()
            .map((info, index) => (
              <div key={index}>
                <CollapseCardComponent data={info} admin={false} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default AnnounceComponent;
