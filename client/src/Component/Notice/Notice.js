import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListDiv, ListItem } from "../../style/ListCSS.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Notice(props) {
  const [NotionList, setNotionList] = useState([]);
  const { userPage } = useParams();
  const user = useSelector((state) => state.user);
  const [UserNum, setUserNum] = useState("0");
  const [postNum, setPostNum] = useState("0");
  useEffect(() => {
    axios
      .post("/api/notice/result")
      .then((response) => {
        if (response.data.success) {
          const UserNum = response.data.UserNum;
          const postNum = response.data.postNum;
          setUserNum(UserNum);
          setPostNum(postNum);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userPage]);

  useEffect(() => {
    axios
      .post("/api/notice/noticelist")
      .then((response) => {
        if (response.data.success) {
          setNotionList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userPage]);

  return (
    <ListDiv>
      {user.userNum === 0 && (
        <div className="freandupload">
          <Link
            to={`/noticeupload`}
            style={{
              color: "white",
              textDecoration: "none",
              margin: "5px",
              fontSize: "15px",
            }}
          >
            공지사항 작성
          </Link>
        </div>
      )}
      <div>
        <p>현재 회원 수 : {UserNum}</p>
        <p>현재 게시글 수 : {postNum}</p>
      </div>
      {NotionList.map((notion, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/notice/${notion.postNum}`}>
              <p>제목: {notion.title}</p>
              <p className="author">작성자 : {notion.author.displayName}</p>
              내용 : {notion.content}
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default Notice;
