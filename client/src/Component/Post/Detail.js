import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import {
  DetailDiv,
  DetailResultDIV,
  Post,
  DetailTitle,
  DetailContent,
  DetailAnswer,
} from "../../style/DetailCSS.js";
import { Link } from "react-router-dom";

function Detail(props) {
  console.log("detail");
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하겠습니까?")) {
      const body = {
        postNum: params.postNum,
        userPage: params.userPage,
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
        <DetailAnswer>
          <Post>
            <DetailTitle>{props.PostInfo.title}</DetailTitle>
            <h3> 작성자 : {props.PostInfo.displayname}</h3>
            <hr />
            {props.PostInfo.image ? (
              <img
                src={props.PostInfo.image}
                alt=""
                style={{ width: "80%", height: "auto" }}
              />
            ) : null}
            <DetailContent>{props.PostInfo.content}</DetailContent>
          </Post>

          {user.uid === props.PostInfo.uid && (
            <>
              <Link to={`/edit/${params.postNum}`}>
                <button>수정</button>
              </Link>

              <button onClick={() => DeleteHandler()}>삭제</button>
            </>
          )}
        </DetailAnswer>
      </DetailResultDIV>
    </DetailDiv>
  );
}

export default Detail;
