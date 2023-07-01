import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListDiv, ListItem } from "../../style/ListCSS.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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

  return (
    <ListDiv>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Link
          to={`/upload/${userPage}`}
          style={{
            color: "black",
            textDecoration: "none",
            marginRight: "10px",
          }}
        >
          친구에게 글 작성하기
        </Link>
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
