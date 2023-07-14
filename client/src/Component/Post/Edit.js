import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  UploadDiv,
  UploadForm,
  UploadButtonDiv,
} from "../../style/UplodeCSS.js";
import ImageUpload from "./ImageUpload.js";

function Edit() {
  const [PW, setPW] = useState("");
  const [Name, setName] = useState("");
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [PostInfo, setPostInfo] = useState({});
  const [setFlag] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [Image, setImage] = useState("");

  useEffect(() => {
    const body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((response) => {
        if (response.data.success) {
          setPostInfo(response.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postNum, setFlag]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("모든 항목을 채워주세요!");
    }

    const body = {
      title: Title,
      content: Content,
      image: Image,
      name: Name,
      PW: PW,
      postNum: params.postNum,
    };

    axios
      .post("/api/post/edit", body)
      .then((response) => {
        if (response.data.success) {
          alert("글 수정이 완료되었습니다..");
          navigate(`/post/${params.userNum}/${params.postNum}`);
        } else {
          alert("글 작성이 글 수정에 실패했습니다..");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
    setName(PostInfo.displayname);
    setPW(PostInfo.PW);
  }, [PostInfo]);

  return (
    <div>
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
    </div>
  );
}

export default Edit;
