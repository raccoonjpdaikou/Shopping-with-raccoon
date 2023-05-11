const express = require("express");
const httpProxy = require("http-proxy");
const app = express();
const proxy = httpProxy.createProxyServer();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes").auth;
const guestRoute = require("./routes").guest;
const infoRoute = require("./routes").info;
const rateRoute = require("./routes").rate;
const commentRoute = require("./routes").comment;
const userRoute = require("./routes").user;
const cors = require("cors");
const passport = require("passport");
require("./config/passport")(passport);
dotenv.config();

// 連結MongoDB
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    console.log("連結到mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//auth 要確定是否是存在於後台的帳號 並判斷客戶或管理者
app.use("/api/user", authRoute);
app.use("/api", guestRoute);

// 以下route應該被jwt保護
// 如果request header內部沒有jwt，則request就會被視為是unauthorized

app.use(
  "/api/admin/info",
  passport.authenticate("jwt", { session: false }),
  infoRoute
);
app.use(
  "/api/admin/rate",
  passport.authenticate("jwt", { session: false }),
  rateRoute
);
app.use(
  "/api/admin/user",
  passport.authenticate("jwt", { session: false }),
  userRoute
);
app.use(
  "/api/admin/comment",
  passport.authenticate("jwt", { session: false }),
  commentRoute
);

app.all("/api/*", (req, res) => {
  proxy.web(req, res, { target: "http://localhost:8080" });
});

app.listen(3030, () => {
  console.log("代理伺服器正在監聽在port 3030...");
});
