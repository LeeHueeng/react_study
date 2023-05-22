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

export { DetailDiv, DetailResultDIV, DetailLoding };
