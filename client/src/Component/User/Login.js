import React from "react";
import LoginDiv from "../../style/UserCSS";

function Login() {
  return (
    <LoginDiv>
      <label>이메일</label>
      <input type="email" />
      <br></br>
      <label>비밀번호</label>
      <input type="password" />
      <button>로그인</button>
      <button>회원가입</button>
    </LoginDiv>
  );
}

export default Login;
