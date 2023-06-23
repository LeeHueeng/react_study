import React, { useState, useEffect } from "react";
import {
  UploadDiv,
  UploadForm,
  UploadButtonDiv,
} from "../../style/UplodeCSS.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload.js";
import Filter from "../../badwords/Filter.js";

import { useSelector } from "react-redux";

function Upload(props) {
  const user = useSelector((state) => state.user);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  let navigate = useNavigate();
  const [Image, setImage] = useState("");

  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인한 회원만 글을 작성 할 수 있습니다.");
      navigate("/login");
    }
  });
  const filteredContent = Filter(Content);

  const clearcontent = () => {
    setContent(filteredContent || "");
    console.log(filteredContent);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요!");
    }

    let body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user.uid,
    };

    axios
      .post("/api/post/submit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate("/");
        } else {
          alert("글 작성이 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="label">제목</label>

        <input
          id="title"
          type="text"
          value={Title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
          }}
        />
        <ImageUpload setImage={setImage}></ImageUpload>
        <label htmlFor="content">내용</label>
        <textarea
          value={Content}
          onChange={(event) => {
            setContent(event.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
          <button
            onClick={(e) => {
              onSubmit(e);
              clearcontent();
            }}
          >
            제출!
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Upload;
