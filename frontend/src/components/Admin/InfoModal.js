import React, { useState, useEffect } from "react";

const InfoModal = ({ type, data, handlePost, handlePatch, handleDelete }) => {
  const title = ["新增公告", "修改公告", "確認是否刪除此公告"];
  const initValue = { title: "", content: "" };
  const [info, setInfo] = useState(initValue);
  const [id, setId] = useState("");
  const [message, setMessage] = useState(false);

  const handleTitle = (e) => {
    setMessage(false);
    setInfo({ ...info, title: e.target.value });
  };
  const handleContent = (e) => {
    setInfo({ ...info, content: e.target.value });
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSaveClick();
  };
  const handleReset = () => {
    setMessage(false);
    if (type) setInfo({ title: data.title, content: data.content });
    else setInfo(initValue);
  };
  const handleSaveClick = () => {
    console.log(info);
    if (info.title === "") {
      setMessage(true);
    } else if (type) {
      setMessage(false);
      handlePatch(id, info);
    } else {
      setMessage(false);
      handlePost(info);
    }
  };
  const handleDelClick = () => {
    handleDelete(id);
  };

  useEffect(() => {
    if (data === undefined || type === 0) {
      setInfo(initValue);
    } else {
      setInfo({ title: data.title, content: data.content });
      setId(data._id);
    }
  }, [type, data]);

  return (
    <>
      {/* title/1.2.3 */}
      <div className="modal-header">
        <h1 className="modal-title fs-3" id="Modal">
          {title[type]}
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      {/* Input版型 */}
      <div className={`modal-body ${type === 2 && "d-none"}`}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <span className="required-star">＊</span>標題
          </label>
          <input
            type="text"
            className={`form-control ${message && "is-invalid"}`}
            onChange={handleTitle}
            onKeyDown={handleKeyDown}
            id="title"
            value={info.title}
          />
          <div className="invalid-feedback ms-1">標題為必填</div>
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            內容
          </label>
          <textarea
            className="form-control"
            onChange={handleContent}
            id="content"
            rows="3"
            value={info.content}
          ></textarea>
        </div>
      </div>
      {/* 文字版型 */}
      <div className={`modal-body ${type !== 2 && "d-none"}`}>
        <div className="mb-3">
          <h4 className="fs-5 fw-bold">標題</h4>
          <p>{info.title}</p>
        </div>
        <div className="mb-3">
          <h4 className="fs-5 fw-bold">內容</h4>
          <p>{info.content}</p>
        </div>
      </div>
      {/* btn */}
      <div className="modal-footer">
        <button
          type="button"
          className={`btn btn-primary ${type === 2 && "d-none"}`}
          onClick={handleReset}
        >
          重置
        </button>
        <button
          type="button"
          className={`btn btn-success ${type === 2 && "d-none"}`}
          onClick={handleSaveClick}
        >
          儲存
        </button>
        <button
          type="button"
          className={`btn btn-danger ${type !== 2 && "d-none"}`}
          onClick={handleDelClick}
        >
          刪除
        </button>
      </div>
    </>
  );
};

export default InfoModal;
