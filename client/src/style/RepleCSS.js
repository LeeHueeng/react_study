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
  width: 100%;

   
  div {

    text-align : left;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    margin-top: 10px;

   
    


    div{
        border-radius: 5px;
        padding : 20px;
        mar
        border: 1px solid #c6c6c6;
        box-shadow: 5px 5px 5px 5px gray;
        width: 80%;
        margin-top :30px;
        margin-bottom :30px;
        
        }
    comment{
        font-weight: normal;
        font-size : 20px;
        margin :10px;
        margin-bottom: 30px;
    }

    titles{
        display: flex;
        justify-content: space-between;

        user{
             color: #c6c6c6;
            font-size : 15px;
            order: 1;
            }  

        span{
            order: 2;
            &:hover{
                background-color: white;
                color:black;
                .hidden{
                
                  display:block;
                  margin : 0px;
                  padding: 0px;
                  box-shadow: 0px 0px 0px 0px gray;
                  width : 60px;
                  text-align: center;
                  p{
                    font-size: 20px;
                    border-radius: 5px;
                    margin: 2px;
                    border: 1px solid #c6c6c6;
                  }
                }
                
          }
       
          
      }
    
    }
    .hidden{
      display: none;
    }
  }
`;
export { RepleUploads, RepleLists };
