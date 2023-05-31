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
          <div className="d-flex flex-column overflow-auto h-100 justify-content-between">
            <ul className="list-group list-group-flush admin-sidebar-link">
              <Link className="list-group-item py-3" to="rate">
                日幣匯率
              </Link>
              <Link className="list-group-item py-3" to="announce">
                公告區
              </Link>
              <Link className="list-group-item py-3" to="meh">
                留言板
              </Link>
              <Link className="list-group-item py-3" to="user">
                密碼管理
              </Link>
            </ul>
            <ul className="list-group list-group-flush admin-sidebar-hp-link">
              <Link className="list-group-item py-3" to="/" target="_blank">
                回首頁
              </Link>
              <Link
                className="list-group-item py-3"
                to="/orders"
                target="_blank"
              >
                訂單查詢
              </Link>
              <Link
                className="list-group-item py-3"
                to="/comments"
                target="_blank"
              >
                留言板
              </Link>
              <Link
                className="list-group-item py-3"
                to="/estimate"
                target="_blank"
              >
                費用估計
              </Link>
              <span className="admin-dashboard-logout">
                <Link
                  className="list-group-item py-3"
                  to="/login"
                  onClick={handleLogout}
                >
                  登出
                </Link>
              </span>
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
          </div>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
