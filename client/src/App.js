import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { loginUser, clearUser } from "./Reducer/userSlice";
import firebase from "./firebase.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostArea from "./Component/Post/PostArea";
import Heading from "./Component/Heading";
import Upload from "./Component/Post/Upload";
import List from "./Component/Post/List";
import Edit from "./Component/Post/Edit";
import Login from "./Component/User/Login";
import Register from "./Component/User/Register";

import NoticeEdit from "./Component/Notice/NoticeEdit";
import Notice from "./Component/Notice/Notice";
import NoticeUpload from "./Component/Notice/NoticeUpload";
import NoticePostArea from "./Component/Notice/NoticePostArea";
import { initializeChannelService } from "./config/initializeChannelService";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  initializeChannelService();
  const Start = useCallback(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        const uid = userInfo.uid;
        axios
          .post("/api/user/getUserNum", { uid })
          .then((response) => {
            const { userNum } = response.data;
            dispatch(loginUser({ ...userInfo.multiFactor.user, userNum }));
          })
          .catch((error) => {
            console.log("Failed to fetch userNum from MongoDB:", error);
          });
      } else {
        dispatch(clearUser());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    Start();
  }, [Start]);

  return (
    <div>
      <BrowserRouter>
        <Heading />
        <Routes>
          <Route path="/" element={<Notice />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/noticeupload" element={<NoticeUpload />} />
          <Route path="/noticeedit/:postNum" element={<NoticeEdit />} />
          <Route path="/notice/:postNum" element={<NoticePostArea />} />
          <Route path="/list/:userPage" element={<List />} />
          <Route path="/upload/:userPage" element={<Upload />} />
          <Route path="/post/:userPage/:postNum" element={<PostArea />} />
          <Route path="/edit/:userPage/:postNum" element={<Edit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
