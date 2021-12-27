import React from "react";
import styled from "styled-components";
import colors from "../colors";

const StyledButton = styled.button`
  width: 100%;
  height: 3rem;
  border: 0.2rem solid ${colors.accent};
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  font-family: "Courier New", monospace;
  color: ${({ primary }) => (primary ? "#fff" : colors.accent)};
  background: ${({ primary }) => (primary ? colors.accent : "#fff")};
  &:hover {
    background: ${({ primary }) => (primary ? "#fff" : colors.accent)};
    color: ${({ primary }) => (primary ? colors.accent : "#fff")};
  }
  @media only screen and (max-width: 500px) {
    height: 2rem;
  }
`;

const Button = ({ children, ...rest }) => {
  return (
    <StyledButton type="button" {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
