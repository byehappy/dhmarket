import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4vw;
`
export const ContText = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  width: 45vw;
`
export const H1 = styled.span`
  font-family: Arimo;
  font-size: 3vw;
`
export const Subtitle = styled.span`
  font-family: Rubik;
  font-size: 1.8vw;
`
export const ContButtons = styled.div`
  padding-top: 2vw;
  display: flex;
`
export const ButtonOne = styled.button`
  background: #000000;
  border-radius: 2vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1vw 2vw;
  gap: 10px;
  font-family: Rubik;
  color: white;
  width: 10vw;
  font-size: 1.5vw;
  height: 4vw;
  text-align: center;
  justify-content: center;
  align-items: center;
`
export const ButtonTwo =styled.button`
  margin-left: 2vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 1vw 2.5vw;
  height: 4vw;
  font-family: Rubik;
  font-size: 1.5vw;
  border: .1vw solid #000000;
  border-radius: 2vw;
  background-color: white;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 20vw;
`
export const Partners = styled.img`
  margin-top: 5vw;
  width: 85vw;
`
export const Picture =styled.img`
  margin-top: 5vw;
  width: 50%;
  height: 25vw;
`

export const ArrowButton = styled.div`
  position: absolute;
  font-size: 2vw;
  color: black;
  z-index: 10;
  cursor: pointer;
`;
export const ButtonLeft = styled.img`
  left: -6vw;
  position: absolute;
  display: block;
  transform: translate(0, 15vw);
  width: 3vw;
`
export const ButtonRight = styled.img`
  right: -5vw;
  position: absolute;
  display: block;
  transform: translate(85vw, -19vw);
  width: 3vw;
`