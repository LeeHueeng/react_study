import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../style/UserCSS";

import firebase from "../../firebase.js";

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [ErrorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  const SingInFunc = async (e) => {
    e.preventDefault();
    if (!(Email && PW)) {
      return alert("모든 값을 채워주세요!");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, PW);
    } catch (error) {
      if ((error.code = "auth/user-not-found")) {
        setErrorMsg("존재하지 않는 이메일입니다.");
      } else if ((error.code = "auth/wrong-password")) {
        setErrorMsg("비밀번호가 일치하지 않습니다.");
      } else {
        setErrorMsg("로그인이 실패하였습니다.");
      }
    }
  };

  return (
    <LoginDiv>
      <label>이메일</label>
      <input
        type="email"
        value={Email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br></br>
      <label>비밀번호</label>
      <input
        type="password"
        value={PW}
        onChange={(e) => setPW(e.currentTarget.value)}
      />
      {ErrorMsg != "" && <p>{ErrorMSG}</p>}
      <button onClick={(e) => SingInFunc(e)}>로그인</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/register");
        }}
      >
        회원가입
      </button>
    </LoginDiv>
  );
}

export default Login;
