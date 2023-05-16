import React, { useState } from "react";

function List(props) {
  return (
    <div>
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
    </div>
  );
}

export default List;
