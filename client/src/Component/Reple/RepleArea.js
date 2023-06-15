import React from "react";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";

function RepleArea(props) {
  console.log(props.postId);
  return (
    <div>
      <RepleUpload postId={props.postId} />
      <RepleList postId={props.postId} />
    </div>
  );
}

export default RepleArea;
