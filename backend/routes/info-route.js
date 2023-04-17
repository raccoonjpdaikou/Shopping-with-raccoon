const router = require("express").Router();
const Info = require("../models").info;
const infoValidation = require("../validation").infoValidation;

router.use((req, res, next) => {
  if (req.user.isCustomer()) {
    return res.status(400).send("你484不是浣熊");
  }
  console.log("info route正在接受一個request...");
  next();
});

// 新增公告
router.post("/", async (req, res) => {
  // 驗證數據符合規範
  let { error } = infoValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { title, content } = req.body;
  try {
    let newInfo = new Info({
      title,
      content,
    });
    let savedInfo = await newInfo.save();
    return res.send("新公告已經保存");
  } catch (e) {
    return res.status(500).send("無法創建新公告");
  }
});

// 更改公告
router.patch("/:_id", async (req, res) => {
  // 驗證數據符合規範
  let { error } = infoValidation(req.body);
  if (error) return res.status(401).send(error.details[0].message);
  let { _id } = req.params;
  try {
    // 確認公告存在
    let infoFound = await Info.findOne({ _id });
    if (!infoFound) {
      return res.status(400).send("公告不存在");
    }

    let updatedInfo = await Info.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });
    return res.send({
      message: "公告已更新",
      updatedInfo,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

//刪除公告
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  // 確認公告存在
  try {
    let infoFound = await Info.findOne({ _id }).exec();
    if (!infoFound) {
      return res.status(400).send("公告不存在");
    }
    await Info.deleteOne({ _id }).exec();
    return res.send("公告已刪除");
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
