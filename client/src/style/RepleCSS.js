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
`;
const RepleLists = styled.div`
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.03), 0px 7.5px 6px rgba(0, 0, 0, 0.1);
  padding: 20px 10px;
  margin-bottom: 10px;
  .author {
    display: flex;
    margin-bottom: 5px;
    justify-content: space-between;
    align-items: center;
    .userInfo {
      display: flex;
      align-items: center;
      color : #808080;
      p {
        font-size: 12px;
        font-weight: bold;
        color: darkgrey;
        margin-left: 10px;
      }
    }
    
  }
  .modalControl {
    cursor: pointer;
    position: relative;
    span {
      user-select: none;
    }
    .modalDiv {
      position: absolute;
      top: 15px;
      right: 10px;
      width: 80px;
      height: 60px;
      overflow: hidden;
      padding: 10px;
      cursor: auto;
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: space-between;
      align-items: center;

      background-color: whitesmoke;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.03),
        0px 7.5px 6px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      p {
        color: black;
        margin-bottom: 0px;
        cursor: pointer;
        &.delete {
          color: red;
        }
      }
    }
  }
}
`;
export { RepleUploads, RepleLists };
