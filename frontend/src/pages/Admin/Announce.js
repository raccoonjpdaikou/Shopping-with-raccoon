import { Modal } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";
import GuestService from "../../services/guest.service";
import InfoService from "../../services/info.service";
import ModalComponent from "../../components/Modal-component";
import InfoModal from "../../components/Admin/InfoModal";
import CollapseCardComponent from "../../components/CollapseCard-component";

const Announce = () => {
  const [type, setType] = useState(0); //0:新增 1:編輯 2:刪除
  const [infos, setInfos] = useState([]); //顯示
  const [data, setData] = useState(); //傳遞
  const modal = useRef(null);

  const openModal = (type, info) => {
    setType(type);
    setData(info);
    modal.current.show();
  };
  const closeModal = () => {
    modal.current.hide();
  };

  const getInfo = () => {
    GuestService.info()
      .then((data) => {
        setInfos(data.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const handlePost = (info) => {
    closeModal();
    InfoService.post(info.title, info.content)
      .then((data) => {
        getInfo();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const handlePatch = (_id, info) => {
    closeModal();
    InfoService.patch(_id, info.title, info.content)
      .then((data) => {
        getInfo();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const handleDelete = (_id) => {
    /* console.log(_id); */
    closeModal();
    InfoService.delete(_id)
      .then((data) => {
        getInfo();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  useEffect(() => {
    modal.current = new Modal("#Modal");
    getInfo();
  }, []);

  return (
    <>
      <ModalComponent>
        <InfoModal
          type={type}
          data={data}
          handlePost={handlePost}
          handlePatch={handlePatch}
          handleDelete={handleDelete}
        />
      </ModalComponent>
      <div className="admin-layout">
        <div className="admin-title ">
          <h2 className="my-auto">公告區</h2>
          <button
            type="button"
            onClick={() => openModal(0, {})}
            className="btn btn-secondary align-items-center"
          >
            建立新公告
          </button>
        </div>
        <hr />

        <div className="admin-content">
          {infos
            .slice(0)
            .reverse()
            .map((data, index) => (
              <div key={index}>
                <CollapseCardComponent
                  data={data}
                  admin={true}
                  openModal={openModal}
                  type={0}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Announce;
