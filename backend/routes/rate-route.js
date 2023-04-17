const router = require("express").Router();
const Rate = require("../models").rate;
const rateValidation = require("../validation").rateValidation;

router.use((req, res, next) => {
  if (req.user.isCustomer()) {
    return res.status(400).send("你484不是浣熊");
  }
  console.log("rate route正在接受一個request...");
  next();
});

//只需要最新一筆

// 新增匯率
router.post("/", async (req, res) => {
  // 驗證數據符合規範
  let { error } = rateValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { rate } = req.body;
  try {
    let newRate = new Rate({
      rate,
    });
    let savedRate = await newRate.save();
    return res.send("新匯率已更新");
  } catch (e) {
    return res.status(500).send("無法更新匯率");
  }
});

//刪除匯率
router.delete("/", async (req, res) => {
  try {
    await Rate.deleteOne().exec();
    return res.send("該筆資料已刪除");
  } catch (e) {
    return res.status(500).send("無法清空匯率");
  }
});

module.exports = router;
