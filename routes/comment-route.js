const router = require("express").Router();
const Comment = require("../models").comment;
const Reply = require("../models").reply;
const replyValidation = require("../validation").replyValidation;
const commentValidation = require("../validation").commentValidation;

router.use((req, res, next) => {
  if (req.user.isCustomer()) {
    return res.status(400).send("你484不是浣熊");
  }
  console.log("正在接收一個跟comment有關的請求");
  next();
});

//顯示所有留言
router.get("/", async (req, res) => {
  try {
    let commentFound = await Comment.find({}).exec();
    return res.send(commentFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//修改狀態或回覆
router.patch("/:_id", async (req, res) => {
  //確認數據是否符合規範
  let { error } = commentValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  try {
    // 確認留言存在
    let commentFound = await Comment.findOne({ _id }).exec();
    if (!commentFound) {
      return res.status(400).send("留言不存在");
    }

    let updatedComment = await Comment.findOneAndUpdate({ _id }, req.body, {
      new: true,
      runValidators: true,
    });

    return res.send({
      message: "留言狀態已更新",
      updatedComment,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

//刪除留言
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  // 確認留言存在
  try {
    let commentFound = await Comment.findOne({ _id }).exec();
    if (!commentFound) {
      return res.status(400).send("留言不存在");
    }
    await Comment.deleteOne({ _id }).exec();
    return res.send("留言已刪除");
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
