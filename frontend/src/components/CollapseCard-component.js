import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

const CollapseCardComponent = ({ data, admin, openModal, type }) => {
  const [open, setOpen] = useState();
  const [content, setContent] = useState({});
  const [height, setHeight] = useState();
  const ref = useRef();
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (type)
      setContent({
        display: data.comment,
        hidden: data.reply,
        color: data.display,
      });
    else setContent({ display: data.title, hidden: data.content, color: true });

    if (open) setHeight(ref.current?.offsetHeight);
    else setHeight(0);
  }, [open, data]);

  return (
    <>
      <div
        className={`collapse-layout ${content.color ? "bg-white" : "bg-dark"}`}
      >
        <div
          className={
            type ? "collapse-display-comment" : "collapse-display-info"
          }
        >
          <div className="flex-grow-1">
            <div className={`${admin && "d-none"}`}>
              <p className="fs-8 m-0">
                {format(parseISO(data.createdAt), "yyyy/MM/dd")}
              </p>
            </div>
            <Link className="text-decoration-none" onClick={handleOpen}>
              <div className="d-flex align-items-center">
                <div className="collapse-title me-auto">{content.display}</div>
                <div className="collapseh-icon">
                  {content.hidden &&
                    (!open ? <RiArrowDownSLine /> : <RiArrowUpSLine />)}
                </div>
              </div>
            </Link>
          </div>
          {/* 管理員顯示區 */}
          <div
            className={`d-flex flex-row justify-content-between ${
              !admin && "d-none"
            }`}
          >
            <div className="d-flex align-items-center mt-1">
              <p className="fs-8 m-0">
                創建：
                {format(parseISO(data.createdAt), "yyyy/MM/dd  HH:mm:ss")}
                <br /> 更新：
                {format(parseISO(data.updatedAt), "yyyy/MM/dd  HH:mm:ss")}
              </p>
            </div>

            <div className="d-flex align-items-center">
              <button
                type="button"
                className="btn btn-dark-raccoon btn-sm ms-2"
                onClick={() => openModal(1, data)}
              >
                {type ? "回覆" : "編輯"}
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm ms-2"
                onClick={() => openModal(2, data)}
              >
                刪除
              </button>
            </div>
          </div>
        </div>
        <div className="collapse-hidden" style={{ height }}>
          {content.hidden && (
            <div ref={ref}>
              {open && <div className="p-3">{content.hidden}</div>}
              <div className={`${admin && "d-none"}`}>
                <p className="fs-8 m-0 text-end p-2">
                  {format(parseISO(data.updatedAt), "yyyy/MM/dd  HH:mm:ss O")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CollapseCardComponent;
