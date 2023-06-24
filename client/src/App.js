import React, { useEffect } from "react";
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
import ChannelService from "./Component/User/ChannelService.js";

function App() {
  ChannelService.loadScript();
  ChannelService.boot({
    pluginKey: "a1686aea-ea22-4974-92b8-328583625997",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  });

  return (
    <div>
      <BrowserRouter>
        <Heading />
        <Routes>
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
