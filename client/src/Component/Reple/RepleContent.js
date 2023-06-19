import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RepleUploads } from "../../style/RepleCSS.js";
function RepleContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const [EdifFlag, setEdifFlag] = useState(false);
  const [Reple, setReple] = useState("");
  const ref = useRef();
  const user = useSelector((state) => state.user);
  useOnClickOutside(ref, () => setModalFlag(false));

  const SubmitHandler = () => {};

  return (
    <div>
      <dix>
        <div class="author">
          <div className="userInfo">
            <p>{props.reple.author.displayName}</p>
            {EdifFlag ? (
              <RepleUploads>
                <input
                  type="text"
                  value={Reple}
                  onChange={(e) => {
                    setReple(e.currentTarget.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    SubmitHandler(e);
                    console.log(props.postId);
                  }}
                >
                  수정
                </button>
                <button
                  className="cancel"
                  onClick={(e) => {
                    e.preventDefault();
                    setEdifFlag(false);
                  }}
                >
                  취소
                </button>
              </RepleUploads>
            ) : (
              <comment>{props.reple.reple}</comment>
            )}
          </div>
          {props.reple.author.uid === user.uid && (
            <div className="modalControl">
              <span onClick={() => setModalFlag(true)}>···</span>
              {ModalFlag && (
                <div className="modalDiv" ref={ref}>
                  <p
                    onClick={() => {
                      setEdifFlag(true);
                      setModalFlag(false);
                    }}
                  >
                    수정
                  </p>
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
