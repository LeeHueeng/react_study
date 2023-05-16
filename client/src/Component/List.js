import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function List(props) {
  const [Text, setText] = useState("");

  useEffect(() => {
    let body = {
      text: "Hello",
    };

    axios
      .post("/api/test", body)
      .then((응답) => {
        console.log(응답);
        setText(응답.data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>List</h1>
      <h3>{Text}</h3>
      {props.ContentList.map((Content, idx) => {
        return (
          <div
            key={idx}
            style={{
              width: "100%",
              marginLeft: "1rem",
            }}
          >
            내용 : {Content}
            <hr />
          </div>
        );
      })}

      <Button>Test</Button>
    </div>
  );
}

export default List;
