import React, { useState, useEffect, useRef } from "react";

function RepleContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const ref = useRef();

  return (
    <div>
      <dix>
        <div class="author">
          <div className="userInfo">
            <p>{props.reple.author.displayName}</p>
            <comment>{props.reple.reple}</comment>
          </div>

          <div className="modalControl">
            <span onClick={() => setModalFlag(true)}>···</span>
            {ModalFlag && (
              <div className="modalDiv">
                <p>수정</p>
                <p className="delete">삭제</p>
              </div>
            )}
          </div>

          <br />
        </div>
      </dix>
    </div>
  );
}
export default RepleContent;
