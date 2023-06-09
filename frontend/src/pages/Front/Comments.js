import { Modal } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";
import GuestService from "../../services/guest.service";
import { format, parseISO } from "date-fns";
import ModalComponent from "../../components/Modal-component";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Footer from "../../components/Footer";

const Comments = () => {
  const [replys, setReplys] = useState();
  const [comment, setComment] = useState();
  const [toggle, setToggle] = useState(1);
  const [btnDisable, setBtnDisable] = useState(false);
  const modal = useRef(null);

  const openModal = () => {
    modal.current.show();
  };
  const closeModal = () => {
    modal.current.hide();
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const getReply = () => {
    GuestService.reply()
      .then((data) => {
        setReplys(data.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
  const handleSubmit = async () => {
    setBtnDisable(true);
    await GuestService.comment(comment, false)
      .then(() => {
        setComment("");
        openModal();
        setTimeout(() => {
          closeModal();
        }, "1000");
        setBtnDisable(false);
      })
      .catch((e) => {
        console.log(e);
        setBtnDisable(false);
      });
  };
  const handleToggle = () => {
    setToggle(toggle ? false : true);
  };
  const handleResize = () => {
    const doc = document.documentElement;
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
  };
  useEffect(() => {
    modal.current = new Modal("#Modal");
    getReply();
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="position-relative">
      <div className="comment-layout">
        <ModalComponent>
          <div className="modal-body comment-modal">
            <div className="comment-modal-close">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="comment-modal-content">
              <IconContext.Provider value={{ size: "7rem", color: "#73967D" }}>
                <BsFillCheckCircleFill />
              </IconContext.Provider>
              <h1>留言已送出</h1>
            </div>
          </div>
        </ModalComponent>
        <div className="comment-footer">
          <Footer />
        </div>

        <div className={`comment-wrapper ${!toggle ? "comment-toggle" : ""}`}>
          <div className="comment-board">
            <div className="comment-bg"></div>
            <div className="comment-main">
              {replys !== undefined &&
                replys
                  .slice(0)
                  .reverse()
                  .map((reply, index) => (
                    <div key={index} className="d-flex flex-column">
                      <div className="comment">
                        <div className="comment-content">
                          <div className="comment-time">
                            {reply.createdAt !== undefined &&
                              format(
                                parseISO(reply.updatedAt),
                                "yyyy/MM/dd HH:mm:ss"
                              )}
                          </div>
                          {reply.comment}
                        </div>
                      </div>
                      <div className="reply">
                        <div
                          className={`reply-content ${
                            !reply.reply && "d-none"
                          }`}
                        >
                          <div className="reply-time">
                            {reply.updatedAt !== undefined &&
                              format(
                                parseISO(reply.updatedAt),
                                "yyyy/MM/dd HH:mm:ss"
                              )}
                          </div>
                          {reply.reply}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="comment-toggle-btn">
            <button className="btn btn-gray-raccoon" onClick={handleToggle}>
              {toggle ? "展開輸入留言" : "收合觀看留言"}
            </button>
          </div>

          <div className="comment-others">
            <div className="comment-others-text-layout">
              <h1>留言板</h1>
              <p>
                為了避免垃圾廣告或機器人惡意灌水留言，
                <br />
                所有留言都會經過小浣熊回應之後才會顯示在頁面上，請見諒
              </p>
            </div>
            <div className="comment-textarea">
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                resize="none"
                onChange={handleComment}
                value={comment}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSubmit}
                disabled={btnDisable}
              >
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
