import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { BsArrowsAngleExpand } from "react-icons/bs";
import AuthService from "../../services/auth.service";

const Dashboard = () => {
  const [open, setOpen] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthService.logout();
  };

  useEffect(() => {
    if (localStorage.getItem("raccoon")) {
      const role = JSON.parse(localStorage.getItem("raccoon")).user.role;
      if (role !== process.env.REACT_APP_ADMIN_PASSWORD) {
        localStorage.removeItem("raccoon");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className={open + ` d-flex`}>
        <aside className="sidebar vh-100 border-end d-flex flex-column">
          <div className="d-flex flex-column overflow-auto">
            <ul className="list-group list-group-flush">
              <Link className="list-group-item py-3" to="rate">
                日幣匯率
              </Link>
              <Link className="list-group-item py-3" to="announce">
                公告區
              </Link>
              <Link className="list-group-item py-3" to="meh">
                留言板
              </Link>
              <Link className="list-group-item py-3 border-end" to="user">
                密碼管理
              </Link>
            </ul>
          </div>
        </aside>
        <main className="main w-100">
          <div className="topbar bg-white w-100 border-bottom d-flex">
            <Link
              className="d-inline-block py-3 px-4 border-end"
              onClick={() => {
                setOpen(open === "" ? "sidebar-toggle" : "");
              }}
            >
              <BsArrowsAngleExpand />
            </Link>
            <h4 className="my-auto mx-4">浣熊工作區</h4>

            <div className="ms-auto my-auto">
              <Link to="/" target="_blank">
                <button
                  type="button"
                  className="btn btn-outline-raccoon btn-sm me-3 px-3 rounded-pill align-self-center"
                >
                  回首頁
                </button>
              </Link>
              <Link to="/orders" target="_blank">
                <button
                  type="button"
                  className="btn btn-outline-raccoon btn-sm me-3 px-3 rounded-pill align-self-center"
                >
                  訂單查詢
                </button>
              </Link>
              <Link to="/comments" target="_blank">
                <button
                  type="button"
                  className="btn btn-outline-raccoon btn-sm me-3 px-3 rounded-pill align-self-center"
                >
                  留言板
                </button>
              </Link>
              <Link to="/estimate" target="_blank">
                <button
                  type="button"
                  className="btn btn-outline-raccoon btn-sm me-3 px-3 rounded-pill align-self-center"
                >
                  費用估計
                </button>
              </Link>
              <Link to="/login">
                <button
                  type="button"
                  className="btn btn-success btn-sm px-3 mx-4"
                  onClick={handleLogout}
                >
                  登出
                </button>
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
