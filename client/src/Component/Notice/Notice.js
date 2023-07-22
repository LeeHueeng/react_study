import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListDiv, ListItem } from "../../style/ListCSS.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/locale/ko";

function Notice(props) {
  const [NotionList, setNotionList] = useState([]);
  const { userPage } = useParams();
  const user = useSelector((state) => state.user);
  const [UserNum, setUserNum] = useState("0");
  const [postNum, setPostNum] = useState("0");
  const SetTime = (a, b) => {
    if (a !== b) {
      return moment(b).format("YYYY년 MMMM Do, hh:mm") + "(수정됨)";
    } else {
      return moment(a).format("YYYY년 MMMM Do, hh:mm");
    }
  };

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
      {user.userNum === "0" && (
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

      <table
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <td>총 회원 수 : {UserNum}</td>
        <td>총 게시글 수 : {postNum}</td>
      </table>

      {NotionList.map((notion, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/notice/${notion.postNum}`}>
              <p>제목: {notion.title}</p>
              <p className="author">작성자 : {notion.author.displayName}</p>
              <div className="content">
                <p className="contents">내용 : {notion.content}</p>
                <p className="time">
                  {SetTime(notion.createdAt, notion.updatedAt)}
                </p>
              </div>
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default Notice;
