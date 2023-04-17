const router = require("express").Router();
const Info = require("../models").info;
const Rate = require("../models").rate;
const Comment = require("../models").comment;
const Reply = require("../models").reply;
const commentValidation = require("../validation").commentValidation;

router.use((req, res, next) => {
  console.log("guest route正在接受一個request...");
  next();
});

// 獲得系統中的所有公告
router.get("/info", async (req, res) => {
  try {
    let infoFound = await Info.find({}).exec();
    return res.send(infoFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 獲得系統中最新的匯率
router.get("/rate", async (req, res) => {
  try {
    let rateFound = await Rate.find({}).exec();
    return res.send(rateFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//新增留言
router.post("/comment", async (req, res) => {
  // 驗證數據符合規範
  let { error } = commentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { comment, display } = req.body;
  try {
    let newComment = new Comment({
      comment,
      display,
    });
    let savedComment = await newComment.save();
    return res.send("新留言已經保存");
  } catch (e) {
    return res.status(500).send("無法創建新留言");
  }
});

// 取得可顯示留言
router.get("/reply", async (req, res) => {
  try {
    let replyFound = await Comment.find({ display: true }).exec();
    return res.send(replyFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});
module.exports = router;
