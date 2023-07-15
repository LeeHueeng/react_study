const express = require("express");
const router = express.Router();
const { Notice } = require("../Model/Notice.js");
const { Counter } = require("../Model/Counter.js");

const { User } = require("../Model/User.js");
const setUpload = require("../utile/upload.js");

router.post("/noticelist", (req, res) => {
  let sort = { createdAt: -1 };
  console.log("요청이 들어왔습니다.");
  Notice.find()
    .populate("author")
    .sort(sort)
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

router.post("/delete", (req, res) => {
  Notice.deleteOne({ postNum: String(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ sucess: false });
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
      const randomPostNum = Math.random().toString(36).substring(2, 8);

      temp.postNum = randomPostNum;

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

router.post("/detail", (req, res) => {
  Notice.findOne({ postNum: String(req.body.postNum) })
    .populate("author")
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post("/result", (req, res) => {
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      const UserNum = counter.userNum;
      const postNum = counter.postNum;

      res.status(200).json({ success: true, UserNum, postNum });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post(
  "/image/upload",
  setUpload("mycommunity/post"),
  (req, res, next) => {
    res.status(200).json({ success: true, filePath: res.req.file.location });
  }
);

router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Notice.updateOne({ postNum: String(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ sucess: false });
    });
});

module.exports = router;
