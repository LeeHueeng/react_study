import styled from "@emotion/styled";

const ListDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  max-width: 756px;
  margin: 0 auto !important;
  @media (max-width: 756px) {
    width: 90%;
  }
  .copy-link-button {
    margin: 5px;
    height: 30px;
    border-radius: 10px;
    background-color: #8064a2;
    color: white;
    border-width: 1px;
    font-size: 15px;
    width: 180px;
    text-align: center;
  }
  .freandupload {
    width: 180px;
    text-align: center;
    background-color: #8064a2;
    border-radius: 10px;
    height: 30px;
    margin: 5px;
    border: 1px solid;
    padding: 1px;
    Link {
    }
  }
`;
const ListItem = styled.div`
  width: 100%;
  height: 150px;
  background: #ffffff;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 15px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);
  a {
    color: black;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
  .content {
    display: flex;
    width: 100%;
    overflow: hidden;
  }
  .contents {
    margin-right: auto;
    max-height: 24px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .time {
    min-width: 220px;
    margin-left: auto;
    font-size: 15px;
    text-align: right;
  }
`;
const Postmodel = styled.div`
  display: flex;
  width: 100%;
  
  .modalDiv {
    text  -align: center;
  }
  .RepleUp {
    text-align: center;
  }
  input {
    border-radius: 10px;
    width: 60%;
    height: 40px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    margin: 5px;
  }
  button {
    margin: 5px;
    height: 40px;
    border-radius: 10px;
    width: 80px;
    background-color: #8064a2;
    color: white;
    font-size: 20px;
  }
  textarea {
    border-radius: 10px;
    width: 60%;
    height: 40px;
    margin: 5px;
    border: 1px solid #c6c6c6;
    padding: 10px;
    min-height: 200px;
  }
`;

export { ListDiv, ListItem, Postmodel };
