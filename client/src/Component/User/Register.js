import React, { useState } from "react";
import LoginDiv from "../../style/UserCSS";

function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

  return (
    <LoginDiv>
      <from>
        <lable>이름</lable>
        <input
          type="name"
          value={Name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <lable>이메일</lable>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <lable>비밀번호</lable>
        <input
          type="password"
          value={PW}
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        <lable>비밀번호 확인</lable>
        <input
          type="password"
          value={PWConfirm}
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        />
        <button>회원가입</button>
      </from>
    </LoginDiv>
  );
}

export default Register;
