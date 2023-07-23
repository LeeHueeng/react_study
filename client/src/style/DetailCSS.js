import styled from "@emotion/styled";

const DetailDiv = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 1rem;
  text-align: center;
  button {
    width: 70px;
    margin: 30px 5px;
    background-color: #8064a2;
    color: white;
    border: 0px;
    border-radius: 5px;
    padding: 10px;
    font-size: 20px;
  }
`;

const DetailResultDIV = styled.div`
  width: 80%;
  margin: auto;
`;

const Post = styled.div`
  width: 80%;
  min-height: 300px;
  margin: auto;
  border: 1px solid black;
  border-radius: 30px;
  box-shadow: 5px 5px 5px 5px gray;
`;
const BtnDiv = styled.button`
  display: block;
  position: relative;
  width: 100px;
  padding: 0;
  margin: 10px 20px 10px 0;
  font-weight: 700;
  text-align: center;
  line-height: 50px;
  color: #fff;
  border-radius: 50px;
  background: black;
  text-decoration: none;
`;

const DetailLoding = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DetailTitle = styled.div`
  font-size: 35px;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const DetailContent = styled.pre`
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0px 40px 0px 40px;
  font-size: 20px;
  font-family: "Jua", sans-serif;
`;
const LinkStyled = styled.div`
  width: 100%;
  button {
    border-radius: 5px;
    margin: 5px;
    font-size: 20px;
    background-color: #8064a2;
    color: white;
    padding: 3px 10px;
  }
`;
const DetailAnswer = styled.div`
  margin: auto;
  .modalDiv {
    margin: 10px;
    label {
      margin: 20px 20px 0px;
    }
    input {
      border-radius: 10px;
      width: 30%;
    }

    }
  }
`;

export {
  DetailDiv,
  DetailResultDIV,
  DetailTitle,
  DetailLoding,
  BtnDiv,
  Post,
  DetailContent,
  DetailAnswer,
  LinkStyled,
};
