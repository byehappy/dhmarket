import styled from "styled-components";
export const Container = styled.div`
display: flex;
  margin: 3vw auto 10vw auto;
  width: 35vw;
  flex-wrap: wrap
`
export const ContainerTemp = styled.div`
display: flex;
`
export const ErrorMessages =styled.div`
  margin-top: 1.5vw;
  margin-left: 0.5vw;
    color: red;
    font-size: 1.2vw;
  text-wrap: normal;
  font-weight: 500;
`
export const H1 = styled.div`
  font-family: Rubik;
  font-size: 4vw;
  font-weight: 700;
  font-style: normal;
  margin-top: 1vw;
`
export const PasswordCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: Arimo;
  font-size: 1.2vw;
  margin-top: .8vw;

  .ErrorMessages {
    color: red;
    font-size: 1vw;
  }
`
export const Password = styled.input`
  background: white;
  border: .1vw solid #9f9f9f;
  border-radius: .5vw;
  width: 34vw;
  height: 2.5vw;
  padding-left: .6vw;
  margin-top: .5vw;
  font-family: Rubik;
  font-size: 1vw;
`
export const Submit = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: black;
  color: white;
  font-family: Rubik;
  font-size: 1.5vw;
  margin-top: 3vw;
  width: 14vw;
  height: 2.8vw;
  border-radius: 1vw;
  
`