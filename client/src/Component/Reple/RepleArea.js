import React from "react";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";

function RepleArea(props) {
  return (
    <div>
      <RepleUpload postId={props.postId} />
      <RepleList />
    </div>
  );
}

export default RepleArea;
