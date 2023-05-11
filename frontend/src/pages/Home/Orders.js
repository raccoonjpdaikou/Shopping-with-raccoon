//接後端帳密
//客戶 登入後 再次登入->是否已存在token先清空再登入 或 換頁->清空token
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GasService from "../../services/gas.service";
import AuthService from "../../services/auth.service";

const Orders = () => {
  const [description, setDescription] = useState(true);
  const [message, setMessage] = useState();
  const [isSubmit, setIsSubmit] = useState();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (isSubmit) {
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (data.username === "") setMessage("該欄位為必填");
    else {
      try {
        let res = await AuthService.check(data.username);
        console.log(res);
        if (res.status === 200) {
          handleLogin();
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleLogin = async (e) => {
    try {
      let res = await AuthService.login(data.username, data.password);
      setDescription(false);
      console.log(res);
    } catch (e) {
      setMessage("帳號或密碼輸入錯誤");
      console.log(e);
    }
  };

  const getOrders = async (e) => {
    let id = "@pandora_btt";
    GasService.orderGet1(id)
      .then((data) => {
        setData1(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    GasService.orderGet2(id)
      .then((data) => {
        setData1(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
    GasService.orderGet3(id)
      .then((data) => {
        setData1(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
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
                type="password"
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
              onClick={handleSubmit}
            >
              確認查詢
            </button>
          </div>
        </form>
        <div className={`order-description ${!description && "d-none"}`}>
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
        <div className={`order-description ${description && "d-none"}`}>
          <h6 className="fw-bold">【狀態顯示】</h6>
          <p className="fw-bold mb-1">
            ※可能未及時更新，可參考【
            <Link
              to="https://docs.google.com/spreadsheets/d/156CTsBneZ5QAPuIuLO2Ao0ES3O8FQgBFm3Kk_GHSDrA/edit?usp=sharing"
              target="_blank"
              className="link"
            >
              到貨行程表
            </Link>
            】
          </p>
          <ul>
            <li>已匯款：浣熊已確認到匯款</li>
            <li>已下單：已下單完畢（詳細請確認原開團噗文，會有訂單截圖）</li>
            <li>
              入庫、轉／空運狀態請參考【
              <Link
                to="https://docs.google.com/spreadsheets/d/156CTsBneZ5QAPuIuLO2Ao0ES3O8FQgBFm3Kk_GHSDrA/edit?usp=sharing"
                target="_blank"
                className="link"
              >
                到貨行程表
              </Link>
              】
            </li>
          </ul>
        </div>
        <div className={`order-table ${data1[1] == undefined && "d-none"}`}>
          <h5>單獨委託</h5>
          <table>
            {data1.map((item, x) =>
              item.data.map((content, y) => {
                if (x > 0 && y === 0) {
                  return (
                    <thead key={x}>
                      <tr>
                        <th colSpan="2">{data1[0].data[1]}</th>
                      </tr>
                      <tr>
                        <td colSpan="2">{item.data[1]}</td>
                      </tr>
                    </thead>
                  );
                } else if (x > 0 && y === item.data.length - 1) {
                  return (
                    <tr key={y + 10} className="table-end">
                      <th>{data1[0].data[y]}</th>
                      <td>{content}</td>
                    </tr>
                  );
                } else if (x > 0 && y > 1) {
                  return (
                    <tr key={y + 10}>
                      <th>{data1[0].data[y]}</th>
                      <td>{content}</td>
                    </tr>
                  );
                }
              })
            )}
          </table>
        </div>
        <div className={`order-table ${data2[1] == undefined && "d-none"}`}>
          <h5>跟團</h5>
          <table>
            {data2.map((item, x) =>
              item.data.map((content, y) => {
                if (x > 0 && y === 0) {
                  return (
                    <thead key={x + 20}>
                      <tr>
                        <th colSpan="2">{data2[0].data[2]}</th>
                      </tr>
                      <tr>
                        <td colSpan="2">{item.data[2]}</td>
                      </tr>
                    </thead>
                  );
                } else if (x > 0 && y === item.data.length - 1) {
                  return (
                    <tr key={y + 30} className="table-end">
                      <th>{data2[0].data[y]}</th>
                      <td>{content}</td>
                    </tr>
                  );
                } else if (x > 0 && y !== 0 && y !== 2) {
                  return (
                    <tr key={y + 30}>
                      <th>{data2[0].data[y]}</th>
                      <td>{content}</td>
                    </tr>
                  );
                }
              })
            )}
          </table>
        </div>
        <div className={`order-table ${data3[1] == undefined && "d-none"}`}>
          <h5>現地</h5>
          {data3.map((item, x) =>
            item.data.map((content, y) => {
              if (x > 0 && y === 0) {
                return (
                  <thead key={x + 40}>
                    <tr>
                      <th colSpan="2">{data3[0].data[2]}</th>
                    </tr>
                    <tr>
                      <td colSpan="2">{item.data[2]}</td>
                    </tr>
                  </thead>
                );
              } else if (x > 0 && y === item.data.length - 1) {
                return (
                  <tr key={y + 50} className="table-end">
                    <th>{data3[0].data[y]}</th>
                    <td>{content}</td>
                  </tr>
                );
              } else if (x > 0 && y !== 0 && y !== 2) {
                return (
                  <tr key={y + 50}>
                    <th>{data3[0].data[y]}</th>
                    <td>{content}</td>
                  </tr>
                );
              }
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
