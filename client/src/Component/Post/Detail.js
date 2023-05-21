import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  useEffect(() => {
    let body = {
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
  }, []);

  useEffect(() => {
    console.log(PostInfo);
  }, [PostInfo]);

  return (
    <div>
      {Flag ? (
        <div>
          {PostInfo.title}
          {PostInfo.content}
        </div>
      ) : null}
    </div>
  );
}

export default Detail;
