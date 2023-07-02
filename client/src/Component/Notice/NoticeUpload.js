import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  UploadDiv,
  UploadForm,
  UploadButtonDiv,
} from "../../style/UplodeCSS.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../Post/ImageUpload.js";

function NoticeUpload(props) {
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoading && !user.accessToken) {
      alert("관리자만 글을 작성 할 수 있습니다.");
      navigate("/login");
    }
  }, [user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요!");
    }

    const body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user.uid,
    };

    axios
      .post("/api/notice/submit", body)
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
            }}
          >
            제출!
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default NoticeUpload;
