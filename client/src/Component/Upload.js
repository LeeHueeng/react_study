import React, { useState, useEffect } from "react";
import { UploadDiv, UploadForm, UploadButton } from "../style/UplodeCSS.js";

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
    <UploadDiv>
      {" "}
      <UploadForm>
      <input
        type="text"
        value={Content}
        onChange={(event) => {
          setContent(event.currentTarget.value);
        }}
      />
      <UploadButton
        onClick={() => {
          onSubmit();
        }}
      >
        제출!
      </UploadButton>
    </UploadDiv>
  );
}

export default Upload;
