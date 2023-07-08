import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListDiv, ListItem } from "../../style/ListCSS.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

function List(props) {
  const [PostList, setPostList] = useState([]);
  const { userPage } = useParams();
  console.log(Notification.permission);
  function getNotificationPermission() {
    if (!("Notification" in window)) {
      alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
      return;
    }

    if (Notification.permission === "granted") {
      alert("이미 알림 권한을 허용하셨습니다.");
      return;
    }

    if (Notification.permission !== "denied") {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            alert("알림을 허용하셨습니다.");
          } else if (permission === "denied") {
            alert("알림 권한을 거부하셨습니다.");
          }
        })
        .catch((error) => {
          console.log("알림 권한 요청에 실패했습니다.", error);
        });
    }
  }

  useEffect(() => {
    axios
      .post("/api/post/list", { userPage: Number(userPage) })
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userPage]);
  const handleLinkCopy = () => {
    alert("링크가 복사되었습니다.");
  };

  return (
    <ListDiv>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div className="freandupload">
          <Link
            to={`/upload/${userPage}`}
            style={{
              color: "white",
              textDecoration: "none",
              margin: "5px",
              fontSize: "15px",
            }}
          >
            친구에게 익명 글 작성하기
          </Link>
          <button onClick={getNotificationPermission}>알람</button>
        </div>
        <hr />

        <CopyToClipboard text={window.location.href} onCopy={handleLinkCopy}>
          <button className="copy-link-button">친구에게 공유하기</button>
        </CopyToClipboard>
      </div>
      {PostList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={`/post/${post.userPage}/${post.postNum}`}>
              <p>제목: {post.title}</p>
              <p className="author">작성자 : {post.displayname}</p>
              내용 : {post.content}
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default List;
