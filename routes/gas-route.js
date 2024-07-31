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

router.post("/order2", async (req, res) => {
  axios
    .get(
      "https://script.google.com/macros/s/AKfycbw8gAT6wj8QGnDWqpYk8_rcHaHpJk4dG0Tc02leKO63Hn_Oi-5cNQyqhsIqUoSF-Rk/exec?uid=" +
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

router.post("/order3", async (req, res) => {
  axios
    .get(
      "https://script.google.com/macros/s/AKfycbziVmtE-ysNtsceAgSLHZgGcb8TYhT3GnTYDRD8pc4sO6vcL-E0QC998lkHkHyyoPUi/exec?uid=" +
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
