import styled from "styled-components";

export const Container = styled.div`
  margin-left: 7vw;
  margin-right: 7vw;
  display: flex;
  flex-direction: row;
  margin-top: 2vw;
`
export const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: 20vw 20vw 20vw;
  gap: 2vw 1vw;
  margin-left: 5vw;
`
export const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1vw 2vw;
  gap: 30px;
  border: 1px solid #9F9F9F;
  border-radius: 20px;
  max-height: 75vw;
`