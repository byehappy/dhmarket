import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 2vw 7vw 5vw 7vw;
  text-align: left;
`
export const Info = styled.div`
  font-size: 1.5vw;
  h2{
    font-size: 1.8vw;
  }
`
export const EditButton = styled.button`
  padding: 10px 20px;
  background-color: #f2f2f2;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1vw;
  font-weight: bold;

  &:hover {
    background-color: #ddd;
  }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }

  div {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    button {
      margin-left: 10px;
      padding: 8px 16px;
      background-color: #f2f2f2;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      font-weight: bold;

      &:hover {
        background-color: #ddd;
      }
    }
  }
`;