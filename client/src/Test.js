import React, { useState, userState } from "react";

function Test() {
  const [Content, setContent] = useState("");
  const [ContentList, setContentList] = useState([]);
  const onSubmit = () => {
    let tempArr = [...ContentList];
    tempArr.push(Content);
    setContentList([...tempArr]);
    setContent("");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
      }}
    >
      {ContentList.map((conten t, idx) => {
        return <div key={idx}>{content}</div>;
      })}
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

export default Test;
