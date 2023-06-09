import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function RepleUpload(props) {
  const [Reple, setReple] = useState("");
  const user = useSelector((state) => state.user);
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!Reple) {
      return alert("댓글을 작성해주세요.");
    }
    let body = {
      reple: Reple,
      uid: user.uid,
      postid: props.postId,
    };

    axios.post("/api/reple/reple", body).then((response) => {
      if (response.data.success) {
        alert("댓글이 작성되었습니다.");
      } else {
        alert("댓글이 작성에 실패했습니다.");
      }
    });
  };
  return (
    <div>
      <input
        type="text"
        value={Reple}
        onChange={(e) => {
          setReple(e.currentTarget.value);
        }}
      />
      <button
        onClick={(e) => {
          SubmitHandler(e);
        }}
      >
        등록
      </button>
    </div>
  );
}

export default RepleUpload;
