import React, { useState, useEffect } from "react";
import axios from "axios";
import { RepleLists } from "../../style/RepleCSS.js";
function RepleList(props) {
  const [repleList, setrepleList] = useState([]);

  useEffect(() => {
    let body = {
      postId: props.postId,
    };
    axios.post("/api/reple/getReple", body).then((response) => {
      if (response.data.success) {
        setrepleList([...response.data.repleList]);
      }
    });
  }, [props.postId]);

  return (
    <RepleLists>
      <div class="List">
        {repleList.map((reple, idx) => {
          return (
            <div key={idx}>
              <user>후엥</user>
              <br />

              <comment>{reple.reple}</comment>
            </div>
          );
        })}
      </div>
    </RepleLists>
  );
}

export default RepleList;
