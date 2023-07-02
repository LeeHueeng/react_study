import React from "react";
import RepleList from "./RepleList";
import RepleUpload from "./RepleUpload";
import { useSelector } from "react-redux";
function RepleArea(props) {
  const user = useSelector((state) => state.user);
  console.log("props.postId", props.postId);
  return (
    <div>
      <RepleUpload postId={props.postId} />
      <RepleList postId={props.postId} />
    </div>
  );
}

export default RepleArea;
