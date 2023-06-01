import React, { useState } from "react";
import LoginDiv from "../../style/UserCSS";

import firebase from "../../firebase";
import axios from "axios";
import { useNavigate, useSubmit } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);

  const RefisterFunc = async (e) => {
    e.preventDefault();
    if (!(Name && Email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
    if (PW.length < 6) {
      return alert("비밀번호를 8자리 이상 해주세요!");
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);
    await createdUser.user.updateProfile({
      displayName: Name,
    });
    console.log(createdUser.user);
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };

    axios.post("/api/user//register", body).then((response) => {
      setFlag(true);
      if (response.data.success) {
        navigate("/login");
        //회원가입 성공
      } else {
        //회원가입 실패시
        return alert("회원가입이 실패했습니다.");
      }
    });
  };
  return (
    <LoginDiv>
      <form>
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
          minLength={8}
          onChange={(e) => setPW(e.currentTarget.value)}
        />
        <lable>비밀번호 확인</lable>
        <input
          type="password"
          value={PWConfirm}
          minLength={8}
          onChange={(e) => setPWConfirm(e.currentTarget.value)}
        />
        <button disabled={Flag} onClick={(e) => RefisterFunc(e)}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
