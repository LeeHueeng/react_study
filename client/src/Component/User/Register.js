import React, { useState, useEffect } from "react";
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
  const [ErrorMsg, setErrorMsg] = useState("");
  const [NameErrorMsg, setNameErrorMsg] = useState("");
  const [EmailErrorMsg, setEmailErrorMsg] = useState("");
  // eslint-disable-next-line
  const [NameList, setNameList] = useState([]);
  const [NickNameChack, setNickNameChack] = useState(0);
  // eslint-disable-next-line
  const [EmaListil, setEmailList] = useState([]);
  const [EmailChack, setEmailChack] = useState(0);
  useEffect(() => {
    console.log("EmailChack 변경됨:", EmailChack);
  }, [EmailChack]);
  useEffect(() => {
    console.log("NickNameChack 변경됨:", NickNameChack);
  }, [NickNameChack]);

  useEffect(() => {
    if (ErrorMsg) {
      const timer = setTimeout(() => {
        setErrorMsg(""); // 에러 메시지 초기화
      }, 3000); // 3초 후에 에러 메시지 초기화
      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 제거
    }
  }, [ErrorMsg]);

  useEffect(() => {
    if (NameErrorMsg) {
      const timer = setTimeout(() => {
        setNameErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [NameErrorMsg]);

  useEffect(() => {
    if (EmailErrorMsg) {
      const timer = setTimeout(() => {
        setEmailErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [EmailErrorMsg]);

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
          return setNameErrorMsg("닉네임을 채워주세요");
        }

        if (Name.length > 10) {
          setNameErrorMsg("닉네임을 10글자 이내로 해주세요");
          setNickNameChack(0);
          console.log(NickNameChack);
          return;
        }
        if (duplicateNames.length > 0) {
          setNameErrorMsg("중복된 닉네임이 있습니다.");
          setNickNameChack(0);
          console.log(NickNameChack);
          return;
        } else {
          setNameErrorMsg("닉네임 사용이 가능합니다.");
          setNickNameChack(1);
          console.log(NickNameChack);
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isEmailTaken = async (e) => {
    e.preventDefault();
    axios
      .post("/api/user/EmailList")
      .then((response) => {
        if (response.data.success) {
          const emailList = response.data.EmailList;

          setEmailList(emailList);
          const duplicateEmails = getDuplicateEmails(emailList);

          if (!Email) {
            return setEmailErrorMsg("이메일을 채워주세요");
          }
          if (isValidEmail(Email)) {
            return setEmailErrorMsg("이메일이 아닙니다.");
          }
          if (Email.length > 25) {
            return setEmailErrorMsg("이메일이 아닙니다.");
          }
          if (duplicateEmails.length > 0) {
            setEmailErrorMsg("중복된 이메일이 있습니다.");
            setEmailChack(0);
            console.log(EmailChack);
            return;
          } else {
            setEmailErrorMsg("이메일 사용이 가능합니다.");
            setEmailChack(1);
            console.log(EmailChack);
            return;
          }
        } else {
          // 유효한 배열이 아닌 경우에 대한 처리
          console.log("Invalid emailList:", response);
          // 오류 처리 또는 기본값 설정 등을 수행
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function getDuplicateEmails(emailList) {
    const duplicateEmails = [];

    for (let i = 0; i < emailList.length; i++) {
      const email = emailList[i].email;
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
      return setErrorMsg("모든 값을 채워주세요.");
    }
    if (PW !== PWConfirm) {
      return setErrorMsg("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }
    if (PW.length < 6) {
      return setErrorMsg("비밀번호를 6자리 이상 해주세요!");
    }
    if (NickNameChack === 0) {
      return setErrorMsg("닉네임 중복검사를 해주세요!");
    }
    if (EmailChack === 0) {
      return setErrorMsg("이메일 중복검사를 해주세요!");
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
        {NameErrorMsg && <p>{NameErrorMsg}</p>}
        <button onClick={(e) => isNicknameTaken(e)}>닉네임 중복 체크</button>
        <lable>이메일</lable>
        <input
          type="email"
          value={Email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        {EmailErrorMsg && <p>{EmailErrorMsg}</p>}
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

        {ErrorMsg && <p>{ErrorMsg}</p>}
        <button disabled={Flag} onClick={(e) => RefisterFunc(e)}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
