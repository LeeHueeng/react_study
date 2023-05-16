import React, { useState, useEffect } from "react";

function Upload(props) {
  const [Content, setContent] = useState("");

  const onSubmit = () => {
    let tempArr = [...props.ContentList];
    tempArr.push(Content);
    props.setContentList([...tempArr]);
    setContent("");
  };

  useEffect(() => {
    console.log("content 가 바뀌었습니다.");
  }, [Content]);

  return (
    <div>
      {" "}
      <input
        type="text"
        value={Content}
        onChange={(event) => {
          setContent(event.currentTarget.value);
        }}
      />
      <button
        onClick={() => {
          onSubmit();
        }}
        style={{ marginTop: "1rem" }}
      >
        제출!
      </button>
    </div>
  );
}

export default Upload;
