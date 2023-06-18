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
      {repleList.map((reple, idx) => {
        return (
          <div key={idx}>
            <div class="author">
              <div className="userInfo">
                <p>{reple.author.displayName}</p>
                <comment>{reple.reple}</comment>
              </div>

              <div className="modalControl">
                <span>···</span>
                <div className="modalDiv">
                  <p>수정</p>
                  <p className="delete">삭제</p>
                </div>
              </div>

              <br />
            </div>
          </div>
        );
      })}
    </RepleLists>
  );
}

export default RepleList;
