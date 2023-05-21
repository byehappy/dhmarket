import styled from "styled-components";
import {NavLink} from "react-router-dom";
export const Container = styled.div`
  height: 10vw;
`
export const ContainOne = styled.div`
  display: flex;
  align-items: center;
  height: 6.5vw;
  margin-left: 7vw;
  margin-right: 7vw;
  border-bottom: 1px solid #9F9F9F;
  
`
export const Logo = styled.img`
  height: 4vw;
`
export const LogoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1vw;
  font-family: Marvel;
  font-size: 1.2vw;
  width: 5vw;
  text-align: left;
  height: 4vw;
  color: black;
`
export const Buttons = styled(NavLink)`
  font-family: Rubik;
  font-size: 1.3vw;
  display: flex;
  justify-content: center;
  color: #9F9F9F;
  text-decoration: none;
`
export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #ffffff;
  border-radius: 3vw;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 6vw;
  height: 2.5vw;
  width: 24vw;
  border: .2vw solid #000000;
  border-radius: 29px;
`;
export const SearchIcon = styled.img`
  height: 1.5vw;
  margin-right: .5vw;
`;
export const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  padding-left: 5px;
  width: 22vw;
  font-size: 16px;
  outline: none;
`;
export const BasicButtonsContainer = styled.div`
  float: right;
  display: flex;
  width: 20vw;
  justify-content: flex-end;
  gap: 3vw;
  margin-left: auto;
  align-items: center;
`
export const Icon = styled.img`
  float: right;
  height: 2vw;
`
export const ContainTwo = styled.div`
  display: flex;
  align-items: center;
  padding-left: 7vw;
  padding-right: 5vw;
`
export const Buttons2 = styled(NavLink)`
  text-decoration: auto;
  margin-left: 1vw;
  margin-top: 1vw;
  font-family: Rubik;
  font-size: 1.3vw;
  display: flex;
  justify-content: center;
  color: #9F9F9F;
`
export const ButtonCont =styled.div`
  gap: 2vw;
  display: flex;
  margin-left: 1vw;
`
export const UserCont = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
export const UserText =styled.div`
  font-size: .9vw;
  color: #424242;
  text-wrap: none;
`
export const UserButton= styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  background: none;
  font-size: 1vw;
  color: gray;
  text-decoration-line: underline;
  padding: 0 0 0 0;
  width: 3vw;
`