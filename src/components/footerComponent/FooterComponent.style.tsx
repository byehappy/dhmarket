import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const FooterContainer = styled.footer`
  margin-top: 2vw;
  padding-top: 1vw;
  border-top: 1px solid #9F9F9F;
  margin-left: 7vw;
  margin-right: 7vw;
  display: flex;
  justify-content: space-between
`
export const TextLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1vw;
  font-family: Marvel;
  font-weight: 700;
  font-size: 1.2vw;
  width: 5vw;
  text-align: left;
  height: 4vw;
  color: black;
`
export const Picture = styled.img`
  height: 4vw;
`
export const LogoContainer = styled(NavLink)`
  display: flex;
  justify-content: left;
  align-items: flex-start;
  text-decoration: none;
  width: 15vw;
`
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2vw;
  align-items: center;
`
export const Buttons = styled(NavLink)`
  font-family: Rubik;
  font-size: 1.3vw;
  display: flex;
  justify-content: center;
  color: #9F9F9F;
  text-decoration: none;
`
export const SocialContainer = styled.div`
  gap: 2vw;
  display: flex;
  align-items: center;
`
export const SocialButton = styled.a`

`
export const SocialImage = styled.img`
  width: 2.5vw;
`