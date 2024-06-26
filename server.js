const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes").auth;
const guestRoute = require("./routes").guest;
const gasRoute = require("./routes").gas;
const infoRoute = require("./routes").info;
const rateRoute = require("./routes").rate;
const commentRoute = require("./routes").comment;
const userRoute = require("./routes").user;
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const port = process.env.PORT || 8080;
require("./config/passport")(passport);
dotenv.config();
// 加入gas前
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
app.use(express.static(path.join(__dirname, "frontend", "build")));

//auth 要確定是否是存在於後台的帳號 並判斷客戶或管理者
app.use("/api/user", authRoute);
app.use("/api", guestRoute);
app.use("/api/gas", gasRoute);

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

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("後端伺服器聆聽在port 8080...");
});
