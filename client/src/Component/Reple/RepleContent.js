import React, { useState, useEffect, useRef } from "react";
import { RepleUploads } from "../../style/RepleCSS.js";
import axios from "axios";

function RepleContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const [EdifFlag, setEdifFlag] = useState(false);
  const [Reple, setReple] = useState(props.reple.reple);
  const ref = useRef();
  const [PWS, setPWS] = useState("");

  useOnClickOutside(ref, () => setModalFlag(false));
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
  const SubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      reple: Reple,
      postId: props.reple.postId,
      repleId: props.reple._id,
      PW: props.reple.PW,
    };
    axios.post("/api/reple/edit", body).then((response) => {
      if (response.data.success) {
        alert("댓글 수정이 성공하였습니다.");
      } else {
        alert("댓글 수정이 실패하였습니다.");
      }
      return window.location.reload();
    });
  };

  const DeliteHandler = (e) => {
    e.preventDefault();
    if (window.confirm("정말로 삭제하겠습니까?")) {
      const body = {
        repleId: props.reple._id,
        postId: props.reple.postId,
      };

      axios
        .post("/api/reple/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("댓글이 삭제되었습니다.");
            return window.location.reload();
          }
        })
        .catch((err) => {
          alert("댓글 삭제에 실패하였습니다.");
        });
    }
  };

  return (
    <div className="ContentContainer">
      <div className="userInfo">
        <p>{props.reple.displayName}</p>
        {EdifFlag ? (
          <RepleUploads>
            <textarea
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
          <pre>{props.reple.reple}</pre>
        )}
      </div>

      <div className="modalControl">
        <span className="menu" onClick={() => setModalFlag(true)}>
          ···
        </span>
        {ModalFlag && (
          <div className="modalDiv" ref={ref}>
            <input
              placeholder="비밀번호"
              type="password"
              value={PWS}
              onChange={(e) => setPWS(e.target.value)}
            />
            {props.reple.PW === PWS && (
              <div>
                <p
                  onClick={() => {
                    setEdifFlag(true);
                    setModalFlag(false);
                  }}
                >
                  수정
                </p>
                <p className="delete" onClick={(e) => DeliteHandler(e)}>
                  삭제
                </p>
              </div>
            )}
          </div>
        )}

        <br />
      </div>
    </div>
  );
}

export default RepleContent;
