const router = require("express").Router();
const User = require("../models").user;

router.use((req, res, next) => {
  if (req.user.isCustomer()) {
    return res.status(400).send("你484不是浣熊");
  }
  console.log("user route正在接受一個request...");
  next();
});

//查看所有用戶
router.get("/", async (req, res) => {
  try {
    let userFound = await User.find({}).exec();
    return res.send(userFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//刪除用戶
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let userFound = await User.findOne({ _id }).exec();
    if (!userFound) {
      return res.status(400).send("此帳號沒有設定密碼");
    }
    await User.deleteOne({ _id }).exec();
    return res.send("帳密設定已刪除");
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
