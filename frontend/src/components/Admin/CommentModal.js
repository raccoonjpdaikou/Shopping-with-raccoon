import React, { useState, useEffect } from "react";

const CommentModal = ({ type, data, handlePatch, handleDelete }) => {
  const title = ["", "回覆留言", "確認是否刪除此留言"];
  const initValue = { comment: "", reply: "", display: false };
  const [comment, setComment] = useState(initValue);
  const [id, setId] = useState("");
  const [message, setMessage] = useState(false);

  const handleComment = (e) => {
    setMessage(false);
    setComment({ ...comment, comment: e.target.value });
  };
  const handleReply = (e) => {
    setComment({ ...comment, reply: e.target.value });
  };
  const handleDisplay = (e) => {
    setComment({ ...comment, display: e.target.checked });
  };

  const handleReset = () => {
    setMessage(false);
    setComment({
      comment: data.comment,
      reply: data.reply,
      display: data.display,
    });
  };
  const handleSaveClick = () => {
    if (comment.comment === "") {
      setMessage(true);
    } else {
      setMessage(false);
      handlePatch(id, comment);
    }
  };
  const handleDelClick = () => {
    handleDelete(id);
  };

  useEffect(() => {
    if (data === undefined) {
      setComment(initValue);
    } else {
      if (!data.reply) setComment({ ...comment, reply: "" });
      setComment({
        comment: data.comment,
        reply: data.reply,
        display: data.display,
      });
      setId(data._id);
    }
  }, [type, data]);

  if (data === undefined) return;

  return (
    <>
      <div className="modal-header">
        <h1 className="modal-comment fs-3 m-0" id="Modal">
          {title[type]}
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>

      <div className={`modal-body ${type === 2 && "d-none"}`}>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">
            <span className="required-star">＊</span>留言
          </label>
          <textarea
            rows="4"
            className={`form-control ${message && "is-invalid"}`}
            onChange={handleComment}
            id="comment"
            value={comment.comment}
          />
          <div className="invalid-feedback ms-1">標題為必填</div>
        </div>
        <div className="mb-3">
          <label htmlFor="reply" className="form-label">
            回覆
          </label>
          <textarea
            className="form-control"
            onChange={handleReply}
            id="reply"
            rows="4"
            value={comment.reply}
          />
        </div>
      </div>
      {/* 文字版型 */}
      <div className={`modal-body ${type !== 2 && "d-none"}`}>
        <div className="mb-3">
          <h4 className="fs-5 fw-bold">留言</h4>
          <p>{comment.comment}</p>
        </div>
        <div className="mb-3">
          <h4 className="fs-5 fw-bold">回覆</h4>
          <p>{comment.reply}</p>
        </div>
      </div>
      {/* btn */}

      <div className="modal-footer">
        <div className="mb-3 form-check me-auto pt-2">
          <input
            id="display"
            type="checkbox"
            className="form-check-input "
            onChange={handleDisplay}
            checked={comment.display}
          />
          <label className="form-check-label" htmlFor="display">
            顯示留言
          </label>
        </div>

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

export default CommentModal;
