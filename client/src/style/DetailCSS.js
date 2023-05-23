import styled from "@emotion/styled";

const DetailDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const DetailResultDIV = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const DetailLoding = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Post = styled.div``;
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

export { DetailDiv, DetailResultDIV, DetailLoding, BtnDiv, Post };
