//接後端帳密
//客戶 登入後 再次登入->是否已存在token先清空再登入 或 換頁->清空token
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import GasService from "../../services/gas.service";

const id = "@pandora_btt";

const Orders = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getOrders = (id) => {
    GasService.get(id)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  const searchHandler = (data) => {
    console.log(data);
  };
  useEffect(() => {
    /* getOrders(id); */
  }, []);
  return (
    <>
      <div className="container bg-white section">
        <h1>訂單查詢</h1>
        <form action="" onSubmit={handleSubmit(searchHandler)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <span className="required-star">＊</span>姓名或帳號
            </label>
            <input
              id="name"
              type="text"
              className={`form-control ${errors.name && "is-invalid"}`}
              {...register("name", { required: true })}
            />
            <div className="invalid-feedback">該欄位為必填</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              密碼
              <button className="btn btn-primary">
                <Link className="nav-link" to="/setting">
                  設定密碼
                </Link>
              </button>
            </label>
            <input
              id="password"
              type="text"
              aria-describedby="PasswordHelp"
              className="form-control"
              {...register("password")}
            />
            <div id="PasswordHelp" className="form-text">
              若無設定無須輸入
            </div>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              查詢
            </button>
          </div>
          <div>
            請注意帳號必須輸入完整才查詢得到，多空白也不行喔！
            <br />
            FB用戶請打上自己的FB名字（有空格也要輸入喔！），輸入範例：小浣熊
            <br />
            噗浪帳號請記得加上半形小老鼠，輸入範例：@raccoon36959
            <br />
            以下若有一點符合，請在Ｖ聯噗文內，聯絡浣熊確認 <br />
            ⓵查詢不到委託內容
            <br />
            ⓶查詢出來的委託內容與喊單內容有誤、有缺少品項
          </div>
        </form>
      </div>
    </>
  );
};

export default Orders;
