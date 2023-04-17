//name:該帳號不存在(googleShit)/重新render錯誤訊息/元件化
import { Modal } from "bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import Footer from "../../components/Footer";
import ModalComponent from "../../components/Modal-component";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

const Setting = () => {
  const navigate = useNavigate();
  const initValue = { username: "", password: "", password2: "", agree: 0 };
  const [data, setData] = useState(initValue);
  const [message, setMessage] = useState({});
  const [isSubmit, setIsSubmit] = useState();
  const modal = useRef(null);

  const openModal = () => {
    modal.current.show();
  };
  const closeModal = () => {
    modal.current.hide();
  };
  const handleUsername = (e) => {
    setMessage({ ...message, username: "" });
    setData({ ...data, username: e.target.value });
  };
  const handlePassword = (e) => {
    setMessage({ ...message, password: "" });
    setMessage({ ...message, password2: "" });
    setData({ ...data, password: e.target.value });
  };
  const handlePassword2 = (e) => {
    setMessage({ ...message, password2: "" });
    setData({ ...data, password2: e.target.value });
  };
  const handleAgree = (e) => {
    setMessage({ ...message, agree: "" });
    setData({ ...data, agree: +e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(validate(data));
    setIsSubmit(true);
    if (Object.keys(message).length === 0 && data.agree && isSubmit)
      handleRegister();
  };
  const handleSubmitChange = (e) => {
    if (isSubmit) {
      setMessage(validate(data));
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-z0-9A-Z]{6,20}$/;
    if (!values.username) {
      errors.username = "此欄位不可為空";
    }
    if (!values.password) {
      errors.password = "此欄位不可為空";
    } else if (!regex.test(values.password)) {
      errors.password = "密碼格式錯誤";
    }
    if (!values.password2) {
      errors.password2 = "此欄位不可為空";
    } else if (values.password2 !== values.password) {
      errors.password2 = "輸入密碼必須相同";
    }
    if (!values.agree) {
      errors.agree = "X";
    }
    return errors;
  };

  useEffect(() => {
    modal.current = new Modal("#Modal");
    if (Object.keys(message).length === 0 && data.agree && isSubmit)
      handleRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  const handleRegister = async () => {
    AuthService.register(data.username, data.password, "customer")
      .then(() => {
        openModal();
        setTimeout(() => {
          closeModal();
        }, "1000");
        navigate("/Orders");
      })
      .catch((e) => {
        setMessage({ username: "此帳號已經設定過密碼了" });
      });
  };

  return (
    <>
      <div className="container section setting-layout">
        <ModalComponent>
          <div className="modal-body comment-modal">
            <div className="comment-modal-close">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="comment-modal-content">
              <IconContext.Provider
                value={{ size: "6.5rem", color: "#73967D" }}
              >
                <BsFillCheckCircleFill />
              </IconContext.Provider>
              <h1>密碼設定成功</h1>
            </div>
          </div>
        </ModalComponent>
        <form onSubmit={handleSubmit}>
          <div className="setting-form">
            <div className="setting-input-section">
              <h1>密碼設定</h1>
              <div className="mb-3">
                <label htmlFor="username" className="form-label w-100">
                  <span className="required-star">＊</span>姓名或帳號
                  <input
                    id="username"
                    className={`form-control ${
                      message.username && "is-invalid"
                    }`}
                    name="username"
                    type="text"
                    onChange={handleUsername}
                    onBlur={handleSubmitChange}
                  />
                  <div className="invalid-feedback ms-1">
                    {message.username}
                  </div>
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label w-100">
                  <span className="required-star">＊</span>密碼
                  <input
                    type="password"
                    className={`form-control ${
                      message.password && "is-invalid"
                    }`}
                    name="password"
                    id="password"
                    aria-describedby="PasswordHelp"
                    onChange={handlePassword}
                    onBlur={handleSubmitChange}
                  />
                  <div id="PasswordHelp" className="form-text">
                    請輸入6至20位英文或數字
                  </div>
                  <div className="invalid-feedback">{message.password}</div>
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="password2" className="form-label w-100">
                  <span className="required-star">＊</span>請再次輸入相同密碼
                  <input
                    type="password"
                    className={`form-control ${
                      message.password2 && "is-invalid"
                    }`}
                    name="password2"
                    id="password2"
                    onChange={handlePassword2}
                    onBlur={handleSubmitChange}
                  />
                  <div className="invalid-feedback">{message.password2}</div>
                </label>
              </div>
            </div>
            <div className="setting-agree-section">
              <div className="setting-agree-content">
                <div className="mb-3">
                  <ol>
                    <li>
                      設定密碼前，請先測試填寫的帳號是否能查詢到訂單資料，若是查無資料，表示帳號是錯誤的，請重新測試或是聯繫小浣熊處理。
                    </li>
                    <li>
                      為了釐清責任，本查詢系統密碼，請勿設定顧客習慣使用之密碼或是相關私密資料（例如生日等），建議密碼組合簡潔即可。
                    </li>
                    <li>修改密碼相關事宜請聯繫小浣熊。</li>
                    <li>
                      本查詢系統密碼相關隱私權規範，皆適用於「
                      <Link to="/privacy">隱私權條款</Link>
                      」。
                    </li>
                  </ol>
                </div>
                <div className="form-check setting-agree">
                  <input
                    id="agreeCheck"
                    type="checkbox"
                    onChange={handleAgree}
                    className={`form-check-input ${
                      message.agree && "is-invalid"
                    }`}
                  />
                  <label className="form-check-label" htmlFor="agree">
                    已閱讀並同意以上說明
                  </label>
                  <div id="agree" className="invalid-feedback">
                    您必須同意以上條款才可送出
                  </div>
                </div>
                <div className="setting-btn">
                  <button type="submit" className="btn btn-success px-5">
                    註冊密碼
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="setting-footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Setting;
