import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GasService from "../../services/gas.service";
import AuthService from "../../services/auth.service";
import Footer from "../../components/Footer";

const SmTable = ({ data, title, key1, key2, key3, headValue, type }) => {
  return (
    <div className={`${data[1] === undefined && "d-none"}`}>
      <h5>{title}</h5>
      {data &&
        data.map((item, x) =>
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
    <div className={`${data[1] === undefined && "d-none"}`}>
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [description, setDescription] = useState(true);
  const [message, setMessage] = useState();
  const [statusMsg, setStatusMsg] = useState("");
  //const [search, setSearch] = useState("");
  const [isSubmit, setIsSubmit] = useState();
  const [isGet, setIsGet] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [settingBtn, setSettingBtn] = useState(false);
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
    setData1([]);
    setData2([]);
    setData3([]);
    setIsSetting(false);
    setSettingBtn(false);
    e.preventDefault();
    setIsSubmit(true);
    setIsGet(false);
    if (data.username === "") setMessage("該欄位為必填");
    else {
      setDescription(true);
      setStatusMsg("查詢中...");
      try {
        let res = await AuthService.check(data.username);
        /* console.log(res); */
        if (res.status === 200) {
          handleLogin();
          setIsSetting(true);
        }
      } catch (e) {
        getOrders(data.username);
      }
    }
  };

  const handleLogin = async (e) => {
    if (data.password !== "") {
      await AuthService.login(data.username, data.password)
        .then(() => {
          getOrders(data.username);
        })
        .catch((e) => {
          setStatusMsg("帳號或密碼輸入錯誤");
        });
    } else {
      setStatusMsg("帳號或密碼輸入錯誤");
    }
  };

  const getOrders = async (id) => {
    try {
      const data1 = await GasService.orderGet1(id);
      setData1(data1.data.data);
    } catch (error) {
      /* console.log(error); */
    }
    try {
      const data2 = await GasService.orderGet2(id);
      setData2(data2.data.data);
    } catch (error) {
      /* console.log(error); */
    }
    try {
      const data3 = await GasService.orderGet3(id);
      setData3(data3.data.data);
    } catch (error) {
      /* console.log(error); */
    }
    setIsGet(true);
  };
  /* const handleSearch = async (e) => {
    setSearch(e.target.value);
  }; */

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (
      data1[1] !== undefined ||
      data2[1] !== undefined ||
      data3[1] !== undefined
    ) {
      setStatusMsg("");
      if (isGet) {
        setDescription(false);
        if (!isSetting) setSettingBtn(true);
      }
    } else {
      if (isGet) {
        setStatusMsg("查無資料！");
      }
    }
  }, [data1, data2, data3]);

  return (
    <div className="order">
      <div className="container order-section">
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
            <button className={`${!settingBtn && "d-none"} btn btn-info me-3`}>
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
            <li>已匯款：已收到款項</li>
            <li>已下單：已收到款項並下單完成</li>
            <li>集運中：表示商品已在集運倉庫</li>
            <li>空運中/或只顯示空運批次：表示商品正在空運中</li>
            <li>理貨中/抵台整理：到台理貨中</li>
            <li>已寄出：商品已寄出</li>
          </ul>
        </div>
        {/* <div className={`order-search ${description && "d-none"}`}>
          <div className="pe-2 fw-bold fs-6 d-flex align-items-center">
            搜尋
          </div>
          <div>
            <input
              id="username"
              className="form-control"
              name="search"
              type="text"
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
        </div> */}

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
      <div className="order-footer bg-primary py-2 container">
        <Footer />
      </div>
    </div>
  );
};

export default Orders;
