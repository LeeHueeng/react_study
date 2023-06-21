const express = require("express");
const router = express.Router();
const { Counter } = require("../Model/Counter.js");
const { User } = require("../Model/User.js");

router.post("/register", (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: "counter" })
    .then((doc) => {
      temp.userNum = doc ? doc.userNum : 0;
      console.log(temp);
      const userData = new User(temp);
      userData.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(
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

router.post("/NameList", (req, res) => {
  console.log("중복값 체크");
  User.find()
    .select("displayName")
    .exec()
    .then((doc) => {
      console.log("데이터 조회 결과:", doc);
      res.status(200).json({ success: true, NameList: doc });
    })
    .catch((err) => {
      console.log("오류 발생:", err);
      res.status(400).json({ success: false });
    });
});

router.post("/EmailList", (req, res) => {
  console.log("중복값 체크");
  User.find()
    .select("email")
    .exec()
    .then((doc) => {
      console.log("데이터 조회 결과:", doc);
      res.status(200).json({ success: true, EmailList: doc });
    })
    .catch((err) => {
      console.log("오류 발생:", err);
      res.status(400).json({ success: false });
    });
});

module.exports = router;
