import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };
  const handleLogin = async (e) => {
    try {
      let res = await AuthService.login(data.username, data.password);
      console.log(res);
      if (res.status === 200 && res.data.user.role !== "customer") {
        localStorage.setItem("raccoon", JSON.stringify(res.data));
        navigate("/admin/rate");
      } else {
        setMessage("你484不是浣熊(ಠ益ಠ)");
      }
    } catch (e) {
      setMessage("帳號密碼輸入錯誤");
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="login-section container pt-5">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h2 className="mb-3 text-center">浣熊登入</h2>

            <div className="mb-3">
              <label htmlFor="username" className="form-label w-100">
                帳號
                <input
                  id="username"
                  className="form-control"
                  name="username"
                  type="text"
                  onChange={handlechange}
                  onKeyDown={handleKeyDown}
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label w-100">
                密碼
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  onChange={handlechange}
                  onKeyDown={handleKeyDown}
                />
              </label>
            </div>
            {message && (
              <div className="alert alert-danger mb-3 mt-5" role="alert">
                {message}
              </div>
            )}
            <div className="pt-3 text-center">
              <button
                type="button"
                className="btn btn-dark-raccoon px-5"
                onClick={handleLogin}
              >
                登入
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
