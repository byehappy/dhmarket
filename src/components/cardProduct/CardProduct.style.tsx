import styled from "styled-components";
export const ProductButtonsContainer = styled.div`
  display: none;
  margin-top: 8px;
  gap: 1vw;
  button {
    margin-right: 8px;
    border: none;
    outline: none;
    background: none;
  }
`;
export const ProductRating = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #ffbe0b;

  svg {
    width: 16px;
    height: 16px;
    fill: #ffbe0b;
    margin-right: 4px;
  }
`;
export const ProductCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  width: 19vw;
  height: 20vw;

  &:hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

    ${ProductButtonsContainer} {
      display: flex;
    }

    ${ProductRating} {
      display: none;
    }
`;
export const ProductImage = styled.img`
  height: auto;
  object-fit: contain;
  margin-bottom: 8px;
  height: 11vw;
`;
export const ProductName = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;
export const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;
