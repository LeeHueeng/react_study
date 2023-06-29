const express = require("express");
const router = express.Router();
const { Notice } = require("../Model/Notice.js");
const { Counter } = require("../Model/Counter.js");
const multer = require("multer");
const { User } = require("../Model/User.js");
const setUpload = require("../utile/upload.js");

router.post("/noticelist", (req, res) => {
  console.log("요청이 들어왔습니다.");
  Notice.find()
    .populate("author")
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

router.post("/submit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;

      User.findOne({ uid: req.body.uid })
        .exec()
        .then((userInfo) => {
          temp.author = userInfo._id;
          const CommunityPost = new Notice(temp);
          CommunityPost.save().then((doc) => {
            Counter.updateOne(
              { name: "counter" },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;
