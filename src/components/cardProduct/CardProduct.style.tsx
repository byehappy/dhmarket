import styled from "styled-components";

export const ProductButtonsContainer = styled.div`
  display: none;
  align-items: center;
  button {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    height: 3vw;
    img{
      display: flex;
      width: 3vw;
      height: 3vw;
    }
  }
`;

export const ProductRating = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4vw;
  color: #ff7a00;

  svg {
    width: 1.5vw;
    height: 1.5vw;
    fill: #ff7a00;
    margin-right: 0.4vw;
  }
`;

export const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6vw;
  border: 0.1vw solid #ccc;
  border-radius: 0.4vw;
  transition: all 0.2s ease-in-out;
  width: 19vw;
  height: 23vw;

  &:hover {
    box-shadow: 0px 0.3vw 0.4vw rgba(0, 0, 0, 0.1);

    ${ProductButtonsContainer} {
      display: flex;
      gap: 2vw;
    }

    ${ProductRating} {
      display: none;
    }
  }
`;

export const ProductImage = styled.img`
  height: auto;
  object-fit: contain;
  margin-bottom: 0.8vw;
  height: 11vw;
`;

export const ProductName = styled.h3`
  font-size: 1.4vw;
  margin-bottom: 0.8vw;
`;

export const ProductPrice = styled.p`
  font-size: 1.6vw;
  font-weight: bold;
  margin-bottom: 0.8vw;
`;
export const Text = styled.div`
    display: flex;
    font-size: 2vw;
`