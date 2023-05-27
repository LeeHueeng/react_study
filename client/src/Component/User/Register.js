import React from "react";
import LoginDiv from "../../style/UserCSS";

function Register() {
  return (
    <LoginDiv>
      <from>
        <lable>이름</lable>
        <input type="name" />
        <lable>이메일</lable>
        <input type="email" />
        <lable>비밀번호</lable>
        <input type="password" />
        <lable>비밀번호 확인</lable>
        <input type="password" />
        <button>회원가입</button>
      </from>
    </LoginDiv>
  );
}

export default Register;
