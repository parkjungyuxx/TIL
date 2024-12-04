import styled from "styled-components";

const ButtonStyledComponent = styled.button`
  background-color: ${(props) => props.color || "#00ffff"};
  font-size: 24px;
  padding: 24px;
  border-radius: 4px;
`;

export default ButtonStyledComponent;
