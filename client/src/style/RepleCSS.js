import styled from "@emotion/styled";

const RepleUploads = styled.div`
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
  justify-content: center;
  text-align: center;

  input {
    border-radius: 10px;
    width: 60%;
    height: 40px;
    margin-right: 20px;
    border: 1px solid #c6c6c6;
  }
  button {
    height: 40px;
    border-radius: 10px;
    width: 80px;
    background-color: #8064a2;
    color: white;
    font-size: 20px;
  }
  textarea {
    border-radius: 10px;
    width: 100%;
    min-height: 200px;
  }
`;
const RepleLists = styled.div`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.03), 0px 7.5px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 10px;
  margin-bottom: 10px;

  .ContentContainer {
    width: 80%;

    display: flex;
    min-height: 85px;
    border-radius: 8px;
    margin: auto;
    margin-top: 30px;
    padding: 20px;
    box-shadow: 5px 5px 5px 5px gray;
  }

  .userInfo {
    color: gray;
    font-size: 15px;
    margin-right: auto;
    width: 100%;
  }
  span {
    margin: auto;
  }
  .modalControl {
    text-align: end;
    padding: 0px;
    width: 100px;
    margin-right: 30px;

    p {
      margin: 0px 5px 0px;
    }

    &:hover,
    &:active {
    }
  }
  .menu {
    text-align: left;
  }
  .modalDiv {
    width: 90px;
    text-align: center;
    position: absolute;
    z-index: 999;
    border-radius: 5px;

    font-size: 15px;
    background-color: white;
    box-shadow: 5px 5px 5px 5px gray;

    .delete {
      color: red;
    }
    input {
      margin: 3px;
      width: 80px;
    }
  }
  comment {
    color: black;
    font-size: 15px;
    margin: 10px;
    word-break: break-word;
    display: block;
  }
`;
export { RepleUploads, RepleLists };
