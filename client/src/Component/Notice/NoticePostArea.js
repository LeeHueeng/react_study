import React, { useState, useEffect } from "react";
import NoticeDetail from "./NoticeDetail";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Spinner } from "react-bootstrap";
import { DetailLoding } from "../../style/DetailCSS.js";

function NoticePostArea() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  const params = useParams();
  useEffect(() => {
    const body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/notice/detail", body)
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

  return (
    <div>
      {Flag ? (
        <>
          <NoticeDetail PostInfo={PostInfo} />
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
export default NoticePostArea;
