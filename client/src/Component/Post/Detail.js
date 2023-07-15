import React, { useState } from "react";
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
  LinkStyled,
} from "../../style/DetailCSS.js";
import { Link } from "react-router-dom";

function Detail(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [PWS, setPWS] = useState("");
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

          <div className="modalDiv">
            <label>수정 및 삭제</label>
            <input
              placeholder="비밀번호"
              type="password"
              value={PWS}
              onChange={(e) => setPWS(e.target.value)}
            />
          </div>
          {props.PostInfo.PW === PWS && (
            <Link to={`/edit/${params.userPage}/${params.postNum}`}>
              <LinkStyled>
                <button className="edit">수정</button>

                <button onClick={() => DeleteHandler()}>삭제</button>
              </LinkStyled>
            </Link>
          )}
        </DetailAnswer>
      </DetailResultDIV>
    </DetailDiv>
  );
}

export default Detail;
