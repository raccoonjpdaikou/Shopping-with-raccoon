const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("正在接收一個跟auth有關的請求");
  next();
});

router.post("/register", async (req, res) => {
  //確認數據是否符合規範
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認帳號是否被註冊過
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist) return res.status(400).send("此帳號已經設定過密碼了");

  // 製作新用戶
  let { username, password, role } = req.body;
  let newUser = new User({ username, password, role });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "密碼成功設定",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("無法設定密碼");
  }
});

router.post("/login", async (req, res) => {
  //確認數據是否符合規範
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認是否被註冊過
  const foundUser = await User.findOne({ username: req.body.username });
  if (!foundUser) {
    return res.status(402).send("該帳號不存在");
  }

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);

    if (isMatch) {
      // 製作json web token
      const tokenObject = { _id: foundUser._id, username: foundUser.username };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "成功登入",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("帳號密碼輸入錯誤");
    }
  });
});

router.post("/check", async (req, res) => {
  // 確認是否被註冊過
  const foundUser = await User.findOne({ username: req.body.username });
  if (!foundUser) {
    return res.status(402).send("該帳號不存在");
  } else return res.send({ message: "已註冊" });
});
module.exports = router;
