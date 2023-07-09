import React, { useState } from "react";
import {
  UploadDiv,
  UploadForm,
  UploadButtonDiv,
} from "../../style/UplodeCSS.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload.js";

function Upload(props) {
  const [PW, setPW] = useState("");

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const navigate = useNavigate();
  const [Image, setImage] = useState("");
  const [Name, setName] = useState("");
  const pathname = window.location.pathname;
  const userPage = pathname.split("/")[2];

  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "" || PW === "" || Name === "") {
      return alert("모든 항목을 채워주세요!");
    }

    const body = {
      title: Title,
      content: Content,
      image: Image,
      name: Name,
      userpage: userPage,
      PW: PW,
    };

    axios
      .post("/api/post/submit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 작성이 완료되었습니다.");
          navigate(`/list/${userPage}`);
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
        <ImageUpload setImage={setImage} />
        <br />
        <label htmlFor="content">내용</label>

        <textarea
          value={Content}
          onChange={(event) => {
            setContent(event.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
          <div>
            <lable>닉네임</lable>
            <input
              id="name"
              type="text"
              value={Name}
              onChange={(event) => {
                setName(event.currentTarget.value);
              }}
            />
            <lable>비밀번호</lable>
            <input
              type="password"
              value={PW}
              onChange={(e) => setPW(e.currentTarget.value)}
            />
            <button
              onClick={(e) => {
                onSubmit(e);
              }}
            >
              제출!
            </button>
          </div>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Upload;
