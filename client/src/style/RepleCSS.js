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
  border: 1px solid gray;
  margin-bottom: 10px;

  .author {
    display: flex;
    border: 1px solid gray;
    min-height: 85px;
    border-radius: 5px;
    margin-bottom:10px;
    padding : 5px;
  }
  .userInfo {
  
    color: gray;
    font-size: 8px;
    margin-right: auto;
    width:100%;
  }
  span {
    margin: auto;


  }
  .modalControl {
    text-align: end;

    padding: 0px;
    width:45px;
  

    p{
      margin: 0px 5px 0px;
    }
   
    &:hover,
    &:active {


    }
  }
  .modalDiv {
    text-align: center;

    border-radius: 5px;
    border: 1px solid gray;
    font-size: 15px;
    .delete{
      color :red;
    }

    
  }
  comment {
    color: black;
    font-size: 20px;
`;
export { RepleUploads, RepleLists };
