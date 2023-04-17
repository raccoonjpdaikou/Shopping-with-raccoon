import React, { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";
import UserService from "../../services/user.service";
import UserDelModal from "../../components/Admin/UserDelModal";
import ModalComponent from "../../components/Modal-component";

const Userslist = ({ user, openModal }) => {
  return (
    <div
      className={`d-flex px-2 py-1 me-3 mb-3 rounded ${
        user.role !== "customer" ? "bg-dark" : "bg-white"
      }`}
    >
      <div className="d-inline-flex align-items-center px-1">
        {user.username}
      </div>
      <div>
        <button
          type="button"
          className="btn btn-danger btn-sm ms-2 "
          onClick={() => openModal(user)}
        >
          刪除
        </button>
      </div>
    </div>
  );
};

const User = () => {
  const [users, setUsers] = useState([]); //顯示
  const [data, setData] = useState(); //傳遞
  const modal = useRef(null);

  const openModal = (user) => {
    setData(user);
    modal.current.show();
  };
  const closeModal = () => {
    modal.current.hide();
  };
  const getData = () => {
    UserService.get()
      .then((data) => {
        setUsers(data.data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };
  const handleDelete = (_id) => {
    closeModal();
    UserService.delete(_id)
      .then((data) => {
        getData();
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  useEffect(() => {
    modal.current = new Modal("#Modal");
    getData();
  }, []);
  return (
    <>
      <ModalComponent>
        <UserDelModal handleDelete={handleDelete} data={data} />
      </ModalComponent>
      <div className="admin-layout">
        <div className="admin-title">
          <h2 className="my-auto">密碼管理</h2>
        </div>
        <hr />

        <div className="admin-content flex-column">
          <div className="d-flex flex-wrap">
            {users
              .filter((user) => user.role === "customer")
              .map((user) => {
                return (
                  <div key={user._id}>
                    <Userslist user={user} openModal={openModal} />
                  </div>
                );
              })}
          </div>
          <hr />
          <div className="d-flex flex-wrap">
            {users
              .filter((user) => user.role !== "customer")
              .map((user) => {
                return (
                  <div key={user._id}>
                    <Userslist user={user} openModal={openModal} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
