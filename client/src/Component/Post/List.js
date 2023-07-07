import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListDiv, ListItem } from "../../style/ListCSS.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

function List(props) {
  const [PostList, setPostList] = useState([]);
  const { userPage } = useParams();

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
              padding: "1px",
            }}
          >
            친구에게 익명 글 작성하기
          </Link>
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
