import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  width: 70%;
  height: 50%;
  margin: 0;
  gap: 2rem;
  display: flex;
  justify-content: center;
  padding: 2rem;
  border-radius: 4rem 1rem;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  overflow: auto;

  @media only screen and (max-width: 500px) {
    height: 70%;
    gap: 1rem;
    padding: 1.5rem;
    flex-direction: column;
  }
  @media only screen and (max-width: 1000px) {
    width: 80%;
  }
`;

const Card = ({ children, ...rest }) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

export default Card;
