import styled from "styled-components";

export const H1 = styled.div`
  font-family: Arimo;
  font-size: 3vw;
  margin-left: 7vw;
  text-align: left;
  margin-top: 2vw;
`
export const ButCategories = styled.button`
  background: white;
  color: black;
  &:active, &.active {
    background-color: black;
    color: white;
  }
  border: .1vw solid #000000;
  border-radius: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  padding: .3vw 2vw;
  font-family: Rubik;
  font-size: 1.5vw;
`
export const ButtonCont = styled.div`
  margin-top: 1vw;
  display: flex;
  margin-left: 7vw;
  gap: 1vw;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F7F6FF;
  padding: 2vw 4vw 2vw 4vw;
  margin: 1vw 7vw 0 7vw;
  border-radius: 2vw;
`;

export const TextContainer = styled.div`
  text-align: left;
  display: flex;
  height: 100%;
  flex-direction: column
`
export const H2 = styled.div`
  font-family: Arimo;
  font-size: 3vw;
`

export const Subtitle = styled.div`
  font-family: Rubik;
  font-size: 1.5vw;
  margin-top: .8vw;
`

export const ButtonNovetly = styled.button`
  outline: none;
  color: white;
  cursor: pointer;
  width: 12vw;
  background: #000000;
  border-radius: 2vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 2vw;
  padding: .5vw 1.5vw;
  font-family: Rubik;
  font-size: 1vw;
`
export const Picture = styled.img`
  width: 30vw;
  padding-top: 4vw;
`