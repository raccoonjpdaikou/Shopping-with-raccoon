import React, { useState, useEffect } from "react";

const UserDelModal = ({ handleDelete, data }) => {
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState(false);
  const handleInput = (e) => {
    setMessage(false);
    setPwd(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleClick();
  };
  const handleClick = () => {
    if (data.role === "customer" && pwd === "123") {
      handleDelete(data._id);
      setMessage(false);
    } else if (pwd === process.env.REACT_APP_DELETE_ACCOUNT) {
      handleDelete(data._id);
      setMessage(false);
    } else {
      setMessage(true);
    }
  };
  useEffect(() => {
    setPwd("");
    setMessage(false);
  }, [data]);

  if (data === undefined) return;

  return (
    <>
      <div className="modal-header">
        <h1 className="modal-title fs-3" id="Modal">
          刪除帳號
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <div className="mb-4">
          <h4>是否刪除帳號：</h4>
          <h2>{data.username}</h2>
        </div>
        <div className="mt-4">
          <form>
            <label htmlFor="password" className="form-label">
              輸入{data.role === "customer" ? "123" : "金鑰"}
              <input
                id="password"
                className={`form-control ${message && "is-invalid"}`}
                name="password"
                type="password"
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                value={pwd}
              />
              <div className="invalid-feedback">輸入錯誤</div>
            </label>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" onClick={handleClick}>
          刪除
        </button>
      </div>
    </>
  );
};
export default UserDelModal;
