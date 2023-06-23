import React, { useState, useEffect } from "react";
import Detail from "./Detail";
import Spinner from "react-bootstrap/Spinner";
import { DetailLoding } from "../../style/DetailCSS.js";
import { useParams } from "react-router-dom";
import axios from "axios";

import RepleArea from "../Reple/RepleArea";
function PostArea() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);
  let params = useParams();

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
  }, [params.postNum]);
  console.log("postinfo", PostInfo);
  return (
    <div>
      {Flag ? (
        <>
          <Detail PostInfo={PostInfo} />
          <RepleArea postId={PostInfo._id} />
        </>
      ) : (
        <DetailLoding>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </DetailLoding>
      )}
    </div>
  );
}

export default PostArea;
