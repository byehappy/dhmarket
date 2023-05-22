import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vw;
  width: auto;
  font-family: Rubik;
  font-weight: 700;
  font-size: 2vw;
`

const NotFound = () => {

    return(
        <Container>
            404<br/>
            Страница не найдена
        </Container>
    )
}
export default NotFound;