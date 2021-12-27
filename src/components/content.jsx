import React from "react";
import styled from "styled-components";
import Particles from "react-particles-js";

const ContentStyled = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
`;

const ParticlesStyled = styled(Particles)`
  width: 100%;
  height: 100vh;
  position: absolute;
  background: #001209;
`;

const Content = ({ children, ...rest }) => {
  return (
    <div>
      <ParticlesStyled
        params={{
          particles: {
            number: {
              value: 20,
            },
            color: {
              value: "#00ff69",
            },
            size: {
              value: 3,
            },
            line_linked: {
              enable: true,
              distance: 140,
              color: "#4dffab",
              opacity: 0.6,
              width: 4,
            },
            move: {
              enable: true,
              speed: 10,
              direction: "bottom",
              out_mode: "out",
            },
          },
          interactivity: {
            detect_on: "window",
            events: {
              onhover: {
                enable: true,
                mode: "bubble",
              },
              onclick: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />
      <ContentStyled {...rest}>{children}</ContentStyled>
    </div>
  );
};

export default Content;
