import styled from "styled-components";
import {NavLink,Link} from "react-router-dom";

interface ContainerProps {
    AuthForm: boolean;
}

export const BasicButton = styled.button`
  outline: none;
  background: none;
  cursor: pointer;
  border: none;
`
export const AccountButton = styled(NavLink)`
  outline: none;
  background: none;
  cursor: pointer;
  border: none;
  height: 2vw;
`
export const Container = styled.div<ContainerProps>`
  display: flex;
  position: absolute;
  z-index: 998;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  background: rgba(227, 217, 231);
  flex-direction: ${({AuthForm}: any) => AuthForm ? 'row' : 'row-reverse'};
`
export const ContainerItem = styled.div<ContainerProps>`
  margin: ${({AuthForm}: any) => AuthForm ? 'auto' : '2vw'} auto 10vw auto;
  padding: 2vw;
  width: 35vw;
  height: ${({AuthForm}: any) => AuthForm ? '37vw' : '45vw'};
  background: whitesmoke;
  border-radius: 2vw;
  box-shadow: 0 0 2vw rgba(0, 0, 0, 0.25);
`
export const PictureRight = styled.img`
  width: 25vw;
  margin-right: 10vw;
`
export const PictureLeft = styled.img`
  width: 30vw;
  margin-left: 10vw;
`
export const ButtonCont = styled.div`
  font-family: 'Rubik';
  font-size: 1vw;
  color: #4F6BFF;
  display: grid;
  grid-template-rows: 15% 15%;
  text-align: right;
  justify-content: end;
`
export const SwapButton = styled.button`
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
  color: #4F6BFF;
  text-decoration: #61dafb;
  text-decoration-line: underline;
  text-align: right;
  padding-top: .3vw;
`
export const Logo = styled.img`
  z-index: 999;
`
export const HeadCont = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`

export const H1 = styled.div`
  font-family: Rubik;
  font-size: 4vw;
  font-weight: 700;
  font-style: normal;
  margin-top: 1vw;
`
export const EmailCont = styled.div`
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
export const ErrorMessages =styled.div`
  margin-top: 1.5vw;
  margin-left: 0.5vw;
    color: red;
    font-size: 1.2vw;
  text-wrap: normal;
  font-weight: 500;
`
export const Email = styled.input`
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
  margin-top: 1.6vw;
  width: 10vw;
  height: 2.8vw;
  border-radius: 1vw;
`
export const NameCont = styled.div`
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
export const Name = styled.input`
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

export const ContainerTemp = styled.div`
display: flex;
`
export const Reset = styled.div`
  margin-top: 2vw;
  margin-left: 1vw;
  font-family: Arimo;
`
export const Denied = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: black;
  color: white;
  font-family: Rubik;
  font-size: 1.5vw;
  margin-top: 1.6vw;
  margin-left: 2vw;
  width: 10vw;
  height: 2.8vw;
  border-radius: 1vw;
`
export const ModalAuthVKButton = styled(Link)`
  border: none;
  cursor: pointer;
  margin-top: 1vw;
`