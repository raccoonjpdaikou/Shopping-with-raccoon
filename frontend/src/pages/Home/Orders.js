import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GasService from "../../services/gas.service";
import AuthService from "../../services/auth.service";
import Footer from "../../components/Footer";

const SmTable = ({ data, title, key1, key2, key3, headValue, type }) => {
  return (
    <div className={`${data[1] == undefined && "d-none"}`}>
      <h5>{title}</h5>
      {data.map((item, x) =>
        x > 0 ? (
          <div key={key1 + x}>
            <table>
              {item.data.map((content, y) =>
                y === 0 ? (
                  <thead key={key2 + y}>
                    <tr>
                      <th colSpan="2">{data[0].data[headValue]}</th>
                    </tr>
                    <tr>
                      <td colSpan="2">{item.data[headValue]}</td>
                    </tr>
                  </thead>
                ) : null
              )}

              {item.data.map((content, y) =>
                type && y > 1 ? (
                  <tbody key={key3 + y}>
                    <tr>
                      <th>{data[0].data[y]}</th>
                      <td>{content}</td>
                    </tr>
                  </tbody>
                ) : null
              )}
              {item.data.map((content, y) =>
                !type && y !== 0 && y !== 2 ? (
                  <tbody key={key3 + y}>
                    <tr>
                      <th>{data[0].data[y]}</th>
                      <td>{content}</td>
                    </tr>
                  </tbody>
                ) : null
              )}
            </table>
            <br />
          </div>
        ) : null
      )}
    </div>
  );
};
const LgTable = ({ data, title, key1, key2, key3, key4, headValue, type }) => {
  return (
    <div className={`${data[1] == undefined && "d-none"}`}>
      <h5>{title}</h5>
      {data.map((item, x) =>
        x > 0 ? (
          <div key={key1 + x}>
            <table>
              {item.data.map((content, y) =>
                y === 0 ? (
                  <thead key={key2 + y}>
                    <tr>
                      <th>{data[0].data[headValue]}</th>
                      <td>{item.data[headValue]}</td>
                    </tr>
                  </thead>
                ) : null
              )}
            </table>
            <table>
              {type ? (
                <tbody>
                  <tr>
                    {item.data.map((content, y) =>
                      y > 1 ? <th key={key3 + y}>{data[0].data[y]}</th> : null
                    )}
                  </tr>
                  <tr>
                    {item.data.map((content, y) =>
                      y > 1 ? <td key={key4 + y}>{content}</td> : null
                    )}
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    {item.data.map((content, y) =>
                      y !== 0 && y !== 2 ? (
                        <th key={key3 + y}>{data[0].data[y]}</th>
                      ) : null
                    )}
                  </tr>
                  <tr>
                    {item.data.map((content, y) =>
                      y !== 0 && y !== 2 ? (
                        <td key={key4 + y}>{content}</td>
                      ) : null
                    )}
                  </tr>
                </tbody>
              )}
            </table>
            <br />
          </div>
        ) : null
      )}
    </div>
  );
};

const Orders = () => {
  let tid = "@pandora_btt";
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [description, setDescription] = useState(true);
  const [message, setMessage] = useState();
  const [statusMsg, setStatusMsg] = useState("");
  const [isSubmit, setIsSubmit] = useState();
  const [isGet, setIsGet] = useState(false);
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
    setIsGet(false);
    if (data.username === "") setMessage("該欄位為必填");
    else {
      setStatusMsg("查詢中...");
      try {
        let res = await AuthService.check(data.username);
        console.log(res);
        if (res.status === 200) {
          handleLogin();
        }
      } catch (e) {
        setDescription(false);
        getOrders(data.username);
      }
    }
  };

  const handleLogin = async (e) => {
    try {
      let res = await AuthService.login(data.username, data.password);
      setDescription(false);
      getOrders(data.username);
    } catch (e) {
      setStatusMsg("帳號或密碼輸入錯誤");
    }
  };

  const getOrders = (id) => {
    GasService.orderGet1(id)
      .then((data) => {
        setData1(data.data);
        setStatusMsg("");
        setIsGet(true);
      })
      .catch((e) => {
        /* console.log(e); */
        setStatusMsg("");
        setIsGet(true);
      });
    GasService.orderGet2(id)
      .then((data) => {
        setData2(data.data);
        setStatusMsg("");
        setIsGet(true);
      })
      .catch((e) => {
        /*console.log(e); */
        setStatusMsg("");
        setIsGet(true);
      });
    GasService.orderGet3(id)
      .then((data) => {
        setData3(data.data);
        setStatusMsg("");
        setIsGet(true);
      })
      .catch((e) => {
        /* console.log(e); */
        setStatusMsg("");
        setIsGet(true);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="order">
      <div className="container section order-section">
        <h1 className="mb-3">訂單查詢</h1>
        <form>
          <div className="input-layout">
            <div className="mb-3 each-input">
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
            <div className="mb-3 each-input">
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
          </div>
          <div className="input-btn mb-3">
            <button className="btn btn-info me-3">
              <Link className="nav-link" to="/setting">
                設定密碼
              </Link>
            </button>
            <button
              type="button"
              className="btn btn-info btn-comfirm"
              onClick={handleSubmit}
            >
              確認查詢
            </button>
          </div>
        </form>
        <div className={`status-message ${!statusMsg && "d-none"}`}>
          {statusMsg}
        </div>
        <div
          className={`status-message ${
            (data1[1] !== undefined ||
              data2[1] !== undefined ||
              data3[1] !== undefined ||
              !isGet) &&
            "d-none"
          }`}
        >
          查無資料！
        </div>

        <div className={`description ${!description && "d-none"}`}>
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
        <div className={`description ${description && "d-none"}`}>
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

        <div className={`sm-table ${screenWidth > 1024 && "d-none"}`}>
          <SmTable
            data={data1}
            title={"單獨委託"}
            key1={"a"}
            key2={"b"}
            key3={"c"}
            headValue={1}
            type={true}
          />
          <SmTable
            data={data2}
            title={"跟團"}
            key1={"d"}
            key2={"e"}
            key3={"f"}
            headValue={2}
            type={false}
          />
          <SmTable
            data={data3}
            title={"現地"}
            key1={"g"}
            key2={"h"}
            key3={"i"}
            headValue={2}
            type={false}
          />
        </div>
        <div className={`lg-table ${screenWidth <= 1024 && "d-none"}`}>
          <LgTable
            data={data1}
            title={"單獨委託"}
            key1={"j"}
            key2={"k"}
            key3={"l"}
            key4={"s"}
            headValue={1}
            type={true}
          />
          <LgTable
            data={data2}
            title={"跟團"}
            key1={"m"}
            key2={"n"}
            key3={"o"}
            key4={"t"}
            headValue={2}
            type={false}
          />
          <LgTable
            data={data3}
            title={"現地"}
            key1={"p"}
            key2={"q"}
            key3={"r"}
            key4={"u"}
            headValue={2}
            type={false}
          />
        </div>
      </div>
      <div className="order-footer sticky-bottom bg-primary py-2">
        <Footer />
      </div>
    </div>
  );
};

export default Orders;
