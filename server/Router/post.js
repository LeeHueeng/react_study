const express = require("express");
const router = express.Router();
const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");
const multer = require("multer");
const { User } = require("../Model/User.js");
const setUpload = require("../utile/upload.js");

router.post("/submit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    userPage: req.body.userpage,
    displayname: req.body.name,
    PW: req.body.PW,
  };
  console.log(temp);
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.postNum = counter ? counter.postNum : 0;
      const CommunityPost = new Post(temp);
      CommunityPost.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { postNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});
router.post("/list", (req, res) => {
  console.log("요청이 들어왔습니다.");
  const userPage = Number(req.body.userPage);
  console.log(userPage);
  Post.find({ userPage: userPage })
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

router.post("/noticelist", (req, res) => {
  console.log("요청이 들어왔습니다.");
  Post.find()
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

router.post("/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .populate("author")
    .exec()
    .then((doc) => {
      console.log(doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch((err) => {
      res.status(400).json({ sucess: false });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ sucess: false });
    });
});

router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ sucess: false });
    });
});

/*

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(200).json({ success: false });
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});
*/

router.post(
  "/image/upload",
  setUpload("react-community-hueeng/post"),
  (req, res, next) => {
    res.status(200).json({ success: true, filePath: res.req.file.location });
  }
);

module.exports = router;
