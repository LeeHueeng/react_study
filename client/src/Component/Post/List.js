import React, { useState, useEffect } from "react";
import axios from "axios";

function List(props) {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    axios
      .post("/api/post/list")
      .then((response) => {
        if (response.data.succes) {
          setPostList([...response.data.postList]);
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>List</h1>

      {PostList.map((post, idx) => {
        return (
          <div>
            <p>제목: {post.title}</p>
            내용 : {post.content}
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default List;
