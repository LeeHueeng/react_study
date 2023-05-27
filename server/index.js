const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const config = require("./config/key.js");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use("/image", express.static("./image"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/post", require("./Router/post.js"));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
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

/*
1. post MongoDB model
2. client CSS(Bootstrap, Emotion)
*/
