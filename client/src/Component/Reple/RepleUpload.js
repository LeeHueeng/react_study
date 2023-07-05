import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RepleUploads } from "../../style/RepleCSS.js";

function RepleUpload(props) {
  const [Reple, setReple] = useState("");
  const [PW, setPW] = useState("");
  const [displayName, setdisplayName] = useState("");
  const user = useSelector((state) => state.user);

  const SubmitHandler = (e) => {
    e.preventDefault();

    if (!Reple) {
      return alert("댓글을 작성해주세요.");
    }
    const body = {
      reple: Reple,
      displayName: displayName,
      postId: props.postId,
      PW: PW,
    };

    axios.post("/api/reple/submit", body).then((response) => {
      if (response.data.success) {
        alert("댓글이 작성되었습니다.");
        window.location.reload();
      } else {
        alert("댓글이 작성에 실패했습니다.");
      }
    });
  };
  return (
    <RepleUploads>
      <input
        placeholder="댓글"
        type="text"
        value={Reple}
        onChange={(e) => {
          setReple(e.currentTarget.value);
        }}
      />
      <br />

      <input
        placeholder="비밀번호"
        type="password"
        value={PW}
        onChange={(e) => {
          setPW(e.currentTarget.value);
        }}
      />

      <input
        placeholder="이름"
        type="text"
        value={displayName}
        onChange={(e) => {
          setdisplayName(e.currentTarget.value);
        }}
      />
      <br />

      <button
        onClick={(e) => {
          SubmitHandler(e);
          console.log(props.postId);
        }}
      >
        등록
      </button>
    </RepleUploads>
  );
}

export default RepleUpload;
