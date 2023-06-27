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
  const [NickNameChack, setNickNameChack] = useState(0);
  const [EmailList, setEmailList] = useState([]);
  const [EmailChack, setEmailChack] = useState(0);

  function isValidEmail(Email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(Email)) {
      return false;
    } else {
      return true;
    }
  }

  const isNicknameTaken = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/NameList");
      if (response.data.success) {
        const nameList = response.data.NameList;
        setNameList(nameList);
        const duplicateNames = getDuplicateNames(nameList);
        if (!Name) {
          return alert("닉네임을 채워주세요");
        }
        if (duplicateNames.length > 0) {
          alert("중복된 닉네임이 있습니다.");
          setNickNameChack(0);
          console.log(NickNameChack);
        } else {
          alert("닉네임 사용이 가능합니다.");
          setNickNameChack(1);
          console.log(NickNameChack);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isEmailTaken = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/EmailList");
      if (response.data.success) {
        const emailList = response.data.EmailList;
        setEmailList(emailList);
        const duplicateEmails = getDuplicateEmails(emailList);

        if (!Email) {
          return alert("이메일을 채워주세요");
        }
        if (isValidEmail(Email)) {
          return alert("이메일이 아닙니다.");
        }
        if (duplicateEmails.length > 0) {
          alert("중복된 이메일이 있습니다.");
          setEmailChack(0);
          console.log(EmailChack);
        } else {
          alert("이메일 사용이 가능합니다.");
          setEmailChack(1);
          console.log(EmailChack);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  function getDuplicateEmails(emailList) {
    const duplicateEmails = [];

    for (let i = 0; i < emailList.length; i++) {
      const email = emailList[i].displayName;
      if (email === Email && !duplicateEmails.includes(Email)) {
        duplicateEmails.push(Email);
      }
    }

    return duplicateEmails;
  }

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
    if (NickNameChack === 0) {
      return alert("닉네임 중복검사를 해주세요!");
    }
    if (EmailChack === 0) {
      return alert("이메일 중복검사를 해주세요!");
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
        <button onClick={(e) => isNicknameTaken(e)}>닉네임 중복 체크</button>
        <lable>이메일</lable>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button onClick={(e) => isEmailTaken(e)}>이메일 중복 체크</button>
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
