import styled from "styled-components";

export const DropdownWrapper = styled.div`
  position: relative;
  display: flex;
`;
export const CatalogIcon = styled.img`
padding-right:1vw ;
  width: 2.8vw;
`

export const DropdownButton = styled.button` 
  font-family: Rubik;
  display: flex;
  align-items: center;
  margin-top: 1vw;
  background-color: white;
  font-size: 1.2vw;
  border: none;
  cursor: pointer;
`;

export const DropdownContentWrapper = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f6f6f6;
  min-width: 230px;
  border: 1px solid #ddd;
  z-index: 1;
  ${(props) => props.isOpen && `display: block;`}
`;

export const Input = styled.input`
  box-sizing: border-box;
  background-image: url('.');
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
  &:focus {
    outline: 3px solid #ddd;
  }
`;

export const DropdownLinkWrapper = styled.div`
  padding: 8px 0;
  &:hover {
    background-color: #ddd;
  }
`;

export const DropdownLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
`;

export const DropdownSubLinkWrapper = styled.div`
  padding: 8px 0 8px 32px;
`;

export const DropdownSubLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
`;