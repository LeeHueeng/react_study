import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {
  DetailDiv,
  DetailResultDIV,
  DetailLoding,
} from "../../style/DetailCSS.js";

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
  });

  useEffect(() => {
    console.log(PostInfo);
  }, [PostInfo]);

  return (
    <DetailDiv>
      <DetailResultDIV>
        {Flag ? (
          <div>
            {PostInfo.title}
            {PostInfo.content}
          </div>
        ) : (
          <DetailLoding>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </DetailLoding>
        )}
      </DetailResultDIV>
    </DetailDiv>
  );
}

export default Detail;
