import { Modal } from "bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CommentService from "../../services/comment.service";
import ModalComponent from "../../components/Modal-component";
import CommentModal from "../../components/Admin/CommentModal";
import CollapseCardComponent from "../../components/CollapseCard-component";

const Meh = () => {
  const selects = ["全部", "未顯示", "已顯示", "未回覆", "已回覆"];
  const [type, setType] = useState(0); //0:編輯 1:刪除
  const [comments, setComments] = useState([]); //顯示
  const [data, setData] = useState(); //傳遞
  const [filter, setFilter] = useState(0);
  const [filed, setFiled] = useState([]);

  const modal = useRef(null);

  const openModal = (type, comment) => {
    setType(type);
    setData(comment);
    modal.current.show();
  };
  const closeModal = () => {
    modal.current.hide();
  };

  const getComment = () => {
    CommentService.get()
      .then((data) => {
        setComments(data.data);
        setFiled(data.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const handlePatch = (_id, comment) => {
    closeModal();
    CommentService.patch(_id, comment.comment, comment.display, comment.reply)
      .then((data) => {
        getComment();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const handleDelete = (_id) => {
    closeModal();
    CommentService.delete(_id)
      .then((data) => {
        getComment();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const handleFilter = (filter) => {
    switch (filter) {
      case 0:
        setFilter(filter);
        setComments(filed);
        break;
      case 1:
        setFilter(filter);
        setComments(filed.filter((file) => file.display === false));
        break;
      case 2:
        setFilter(filter);
        setComments(filed.filter((file) => file.display === true));
        break;
      case 3:
        setFilter(filter);
        setComments(filed.filter((file) => file.reply === undefined));
        break;
      case 4:
        setComments(filed.filter((file) => file.reply !== undefined));
        break;
      /*       case 5:
        setFilter(0);
        break; */
      default:
    }
  };
  useEffect(() => {
    modal.current = new Modal("#Modal");
    getComment();
  }, [setComments]);

  return (
    <>
      <ModalComponent>
        <CommentModal
          type={type}
          data={data}
          handlePatch={handlePatch}
          handleDelete={handleDelete}
        />
      </ModalComponent>
      <div className="admin-layout">
        <div className="admin-title ">
          <h2 className="my-auto">留言管理</h2>
          <div className="dropdown-center">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {selects[filter]}
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" onClick={() => handleFilter(0)}>
                  {selects[0]}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" onClick={() => handleFilter(1)}>
                  {selects[1]}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" onClick={() => handleFilter(2)}>
                  {selects[2]}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" onClick={() => handleFilter(3)}>
                  {selects[3]}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" onClick={() => handleFilter(4)}>
                  {selects[4]}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />

        <div className="admin-content flex-column">
          {comments
            .slice(0)
            .reverse()
            .map((data, index) => (
              <div key={index}>
                <CollapseCardComponent
                  data={data}
                  admin={true}
                  openModal={openModal}
                  type={1}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Meh;
