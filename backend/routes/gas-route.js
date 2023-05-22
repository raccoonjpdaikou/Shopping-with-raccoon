const router = require("express").Router();

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
        data: data,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).send("伺服器出現問題");
    });
});
module.exports = router;
