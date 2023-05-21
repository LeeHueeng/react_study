import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListDiv, ListItem } from "../../style/ListCSS.js";
import { Link } from "react-router-dom";
function List(props) {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ListDiv>
      <h1>List</h1>
      {PostList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            <Link to={"/post/${post.postNum}"}>
              <p>제목: {post.title}</p>
              내용 : {post.content}
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default List;