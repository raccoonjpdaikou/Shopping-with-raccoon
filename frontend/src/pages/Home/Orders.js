//接後端帳密
//客戶 登入後 再次登入->是否已存在token先清空再登入 或 換頁->清空token
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GasService from "../../services/gas.service";
import AuthService from "../../services/auth.service";

const id = "@pandora_btt";

const Orders = () => {
  const [message, setMessage] = useState();
  const [isSubmit, setIsSubmit] = useState();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (isSubmit) {
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (data.username === "") setMessage("該欄位為必填");
    else {
      try {
        let res = await AuthService.login(data.username, data.password);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
    console.log(data.username);
    console.log(data.password);
  };

  /* const getOrders = (id) => {
    GasService.get(id)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  }; */

  useEffect(() => {}, []);
  return (
    <>
      <div className="container section order-section">
        <form>
          <h1 className="mb-3">訂單查詢</h1>
          <div className="mb-3">
            <label htmlFor="username" className="form-label w-100">
              <span className="required-star">＊</span>姓名或帳號
              <input
                id="username"
                className={`form-control ${message && "is-invalid"}`}
                name="username"
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <div className="invalid-feedback ms-1">{message}</div>
            </label>
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="form-label w-100">
              密碼
              <input
                id="password"
                className="form-control"
                name="password"
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </label>
          </div>
          <div className="mb-3">
            <button className="btn btn-info me-3">
              <Link className="nav-link" to="/setting">
                設定密碼
              </Link>
            </button>
            <button
              type="button"
              className="btn btn-info order-btn-comfirm"
              onClick={handleLogin}
            >
              確認查詢
            </button>
          </div>
        </form>
        <div className="order-description">
          <h6 className="fw-bold text-danger">【查詢系統使用說明】</h6>
          <ol>
            <li>請注意名字必須輸入完整、正確才查詢得到。（請注意大小寫）</li>
            <li>
              FB用戶請打上自己的FB名字（有空格也要輸入），輸入範例：小浣熊
            </li>
            <li>噗浪帳號請記得加上半形小老鼠，輸入範例：@raccoon36959</li>
          </ol>
          <p>
            查詢不到委託內容、查詢出來的委託內容與喊單內容有誤或有缺少品項，請聯絡小浣熊處理
          </p>
        </div>
      </div>
    </>
  );
};

export default Orders;
