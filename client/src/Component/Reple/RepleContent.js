import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function RepleContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const ref = useRef();
  const user = useSelector((state) => state.user);
  useOnClickOutside(ref, () => setModalFlag(false));
  return (
    <div>
      <dix>
        <div class="author">
          <div className="userInfo">
            <p>{props.reple.author.displayName}</p>
            <comment>{props.reple.reple}</comment>
          </div>
          {props.reple.author.uid === user.uid && (
            <div className="modalControl">
              <span onClick={() => setModalFlag(true)}>···</span>
              {ModalFlag && (
                <div className="modalDiv" ref={ref}>
                  <p>수정</p>
                  <p className="delete">삭제</p>
                </div>
              )}
            </div>
          )}

          <br />
        </div>
      </dix>
    </div>
  );
}

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default RepleContent;
