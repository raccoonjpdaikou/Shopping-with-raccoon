const router = require("express").Router();
const axios = require("axios");

router.use((req, res, next) => {
  console.log("gas route正在接受一個request...");
  next();
});

router.post("/order1", async (req, res) => {
  axios
    .get(
      "https://script.google.com/macros/s/AKfycbyvjLtLKOiHiZA_TYLZg6xKflV0UyJBOdkIDCPQ1B00oT8knEHBlz60xNkhhmBuyTfWiQ/exec?uid=" +
        req.body.username
    )
    .then((data) => {
      return res.send({
        message: "獲得資料成功",
        data: data.data,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).send(req.body.username);
    });
});
module.exports = router;
