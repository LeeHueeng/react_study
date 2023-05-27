import React, { useState } from "react";
import LoginDiv from "../../style/UserCSS";

import firebase from "../../firebase";
function Register() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");

  const RefisterFunc = async (e) => {
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);
    await createdUser.user.updateProfile({
      displayName: Name,
    });
    console.log(createdUser.user);
  };
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
        <button onClick={(e) => RefisterFunc(e)}>회원가입</button>
      </from>
    </LoginDiv>
  );
}

export default Register;
