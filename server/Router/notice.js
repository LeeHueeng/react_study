const express = require("express");
const router = express.Router();
const { Notice } = require("../Model/Notice.js");

router.post("/noticelist", (req, res) => {
  console.log("요청이 들어왔습니다.");
  Notice.find()
    .exec()
    .then((doc) => {
      console.log("데이터 조회 결과:", doc);
      res.status(200).json({ success: true, postList: doc });
    })
    .catch((err) => {
      console.log("오류 발생:", err);
      res.status(400).json({ success: false });
    });
});

module.exports = router;
