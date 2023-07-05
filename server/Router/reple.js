const express = require("express");
const router = express.Router();
const { Post } = require("../Model/Post.js");
const { Reple } = require("../Model/Reple.js");
const { User } = require("../Model/User.js");

router.post("/submit", (req, res) => {
  let temp = {
    reple: req.body.reple,
    postId: req.body.postId,
    displayName: req.body.displayName,
    PW: req.body.PW,
  };

  Post.findOne({ postNum: req.body.postNum })
    .exec()
    .then((page) => {
      const NewReple = new Reple(temp);
      NewReple.save()
        .then(() => {
          Post.findOneAndUpdate(
            {
              _id: req.body.postId,
            },
            { $inc: { repleNum: 1 } }
          )
            .exec()
            .then(() => {
              return res.status(200).json({ success: true });
            });
        })
        .catch((err) => {
          return res.status(500).json({ success: false, error: err });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
      return;
    });
});

router.post("/getReple", (req, res) => {
  Reple.find({ postId: req.body.postId })
    .exec()
    .then((repleInfo) => {
      return res.status(200).json({
        success: true,
        repleList: repleInfo,
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({
        success: false,
      });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    postId: req.body.postId,
    reple: req.body.reple,
    uid: req.body.uid,
  };
  Reple.findOneAndUpdate({ _id: req.body.repleId }, { $set: temp })
    .exec()
    .then(() => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
      });
    });
});

router.post("/delete", (req, res) => {
  let temp = {
    postId: req.body.postId,
    reple: req.body.reple,
    uid: req.body.uid,
  };
  Reple.deleteOne({ _id: req.body.repleId })
    .exec()
    .then(() => {
      Post.findOneAndUpdate(
        {
          _id: req.body.postId,
        },
        { $inc: { repleNum: -1 } }
      )
        .exec()
        .then(() => {
          return res.status(200).json({
            success: true,
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({
            success: false,
          });
        });
    });
});

module.exports = router;
