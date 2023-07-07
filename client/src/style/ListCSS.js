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
  height: auto;
  min-height: 120px;
  background: #ffffff;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding: 20px;
  box-shadow: 0px 19px 38px rgba(0, 0, 0, 0.03),
    0px 15px 12px rgba(0, 0, 0, 0.1);
  a {
    color: black;
    text-decoration: none;
    .title {
      font-weight: bold;
    }
  }
`;

export { ListDiv, ListItem };
