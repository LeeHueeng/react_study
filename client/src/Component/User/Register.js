import React, { useState } from "react";
import LoginDiv from "../../style/UserCSS";
import firebase from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWConfirm, setPWConfirm] = useState("");
  const [Flag, setFlag] = useState(false);
  const [NameList, setNameList] = useState([]);
  const [Chack, setChack] = useState(0);

  const isNicknameTaken = async (e, Chack) => {
    e.preventDefault();

    axios
      .post("/api/user/NameList")
      .then((response) => {
        if (response.data.success) {
          const nameList = response.data.NameList;
          setNameList(nameList);
          const duplicateNames = getDuplicateNames(nameList);
          if (duplicateNames.length > 0) {
            alert("중복된 닉네임이 있습니다.");
            setChack(0);
            console.log(Chack);
          } else {
            alert("닉네임 사용이 가능합니다.");
            setChack(1);
            console.log(Chack);
          }
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  function getDuplicateNames(nameList) {
    const duplicateNames = [];

    for (let i = 0; i < nameList.length; i++) {
      const name = nameList[i].displayName;
      if (name === Name && !duplicateNames.includes(name)) {
        duplicateNames.push(name);
      }
    }

    return duplicateNames;
  }

  const RefisterFunc = async (e) => {
    e.preventDefault();

    if (!(Name && Email && PW && PWConfirm)) {
      return alert("모든 값을 채워주세요!");
    }
    if (PW !== PWConfirm) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
    if (PW.length < 6) {
      return alert("비밀번호를 6자리 이상 해주세요!");
    }
    if (Chack === 0) {
      return alert("닉네임 중복검사를 해주세요!");
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);
    await createdUser.user.updateProfile({
      displayName: Name,
    });

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };

    axios.post("/api/user/register", body).then((response) => {
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
        <lable>닉네임</lable>
        <input
          type="name"
          value={Name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <button onClick={(e) => isNicknameTaken(e)}>중복 체크</button>
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
