const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const mongoose = require("mongoose");

//mongodb+srv://zzxx373014:!hyeonu5380@cluster0.ph9rwlh.mongodb.net/?retryWrites=true&w=majority

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require("./Model/Post.js");

app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://zzxx373014:!hyeonu5380@cluster0.ph9rwlh.mongodb.net/Community?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connectiong MongoDB...");
      console.log(`Example app listening on port ${port}`);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (요청, 응답) => {
  응답.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (요청, 응답) => {
  응답.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (요청, 응답) => {
  const CommunityPost = new Post({ title: "test", content: "테스트입니다." });
  CommunityPost.save().then(() => {
    응답.status(200).json({ success: true, text: " 안녕하세요." });
  });
});

/*
1. post MongoDB model
2. client CSS(Bootstrap, Emotion)

*/
