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

  useEffect(() => {
    console.log("user", user.userNum);
  }, [user]);

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
