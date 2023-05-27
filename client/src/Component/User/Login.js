import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../../style/UserCSS";

function Login() {
  const [Email, setEmail] = useState("");
  const [Pw, setPW] = useState("");

  let navigate = useNavigate();

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
        value={Pw}
        onChange={(e) => setPW(e.currentTarget.value)}
      />
      <button>로그인</button>
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
