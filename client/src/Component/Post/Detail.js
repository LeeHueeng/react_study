import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import {
  DetailDiv,
  DetailResultDIV,
  DetailLoding,
  BtnDiv,
  Post,
  DetailTitle,
  DetailContent,
  DetailAnswer,
} from "../../style/DetailCSS.js";
import { Link } from "react-router-dom";

function Detail() {
  let params = useParams();
  let navigate = useNavigate();
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
  }, [params.postNum]);

  useEffect(() => {
    console.log(PostInfo);
  }, [PostInfo]);

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/");
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <DetailDiv>
      <DetailResultDIV>
        {Flag ? (
          <DetailAnswer>
            <Post>
              <DetailTitle>{PostInfo.title}</DetailTitle>
              <hr />
              <DetailContent>{PostInfo.content}</DetailContent>
            </Post>

            <button>
              <Link to={`/api/post/edit/${params.postNum}`}>수정 </Link>
            </button>
            <BtnDiv>수정</BtnDiv>

            <BtnDiv onClick={() => DeleteHandler()}>삭제</BtnDiv>
          </DetailAnswer>
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
