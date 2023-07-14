import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ListDiv, ListItem, Postmodel } from "../../style/ListCSS.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

function List(props) {
  const [PWS, setPWS] = useState("");

  const [PostList, setPostList] = useState([]);
  const { userPage } = useParams();
  const ref = useRef();
  const [ModalFlag, setModalFlag] = useState(false);

  const DeliteHandler = (e) => {
    e.preventDefault();
    if (window.confirm("정말로 삭제하겠습니까?")) {
      const body = {
        postNum: props.post.postNum,
      };

      axios
        .post("/api/post/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("게시글이 삭제되었습니다.");
            return window.location.reload();
          }
        })
        .catch((err) => {
          alert("게시글 삭제에 실패하였습니다.");
        });
    }
  };

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

  useEffect(() => {
    axios
      .post("/api/post/list", { userPage: String(userPage) })
      .then((response) => {
        if (response.data.success) {
          setPostList([...response.data.postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userPage]);
  const handleLinkCopy = () => {
    alert("링크가 복사되었습니다.");
  };

  return (
    <ListDiv>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div className="freandupload">
          <Link
            to={`/upload/${userPage}`}
            style={{
              color: "white",
              textDecoration: "none",
              margin: "5px",
              fontSize: "15px",
            }}
          >
            친구에게 익명 글 작성하기
          </Link>
        </div>
        <hr />

        <CopyToClipboard text={window.location.href} onCopy={handleLinkCopy}>
          <button className="copy-link-button">친구에게 공유하기</button>
        </CopyToClipboard>
      </div>

      {PostList.map((post, idx) => {
        return (
          <ListItem key={idx}>
            {" "}
            <Postmodel>
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
                    {post.PW === PWS && (
                      <div>
                        <p
                          onClick={() => {
                            setModalFlag(false);
                            <Link to={`/edit/${post.postNum}`}></Link>;
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
            </Postmodel>
            <Link to={`/post/${post.userPage}/${post.postNum}`}>
              <p>제목: {post.title}</p>
              <p className="author">작성자 : {post.displayname}</p>
              내용 : {post.content}
            </Link>
          </ListItem>
        );
      })}
    </ListDiv>
  );
}

export default List;
