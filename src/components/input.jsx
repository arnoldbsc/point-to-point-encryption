import React from "react";
import { Field } from "formik";
import styled from "styled-components";
import colors from "../colors";

const TextAreaStyled = styled.textarea`
  width: 100%;
  flex-grow: 1;
  margin: 0;
  padding-top: 0.5rem;
  box-sizing: border-box;
  resize: none;
  font-size: 1rem;
  font-family: "Courier New", monospace;
  border: solid 0.2rem ${colors.accent};
  border-color: ${({ meta }) => meta.touched && meta.error && "red"};
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-width: 0.3rem;
  }
`;

const InputStyled = styled.input`
  position: relative;
  top: 0;
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  font-family: "Courier New", monospace;
  box-sizing: border-box;
  border: solid 0.2rem ${colors.accent};
  border-color: ${({ meta }) => meta.touched && meta.error && "red"};
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-width: 0.3rem;
  }
  &:disabled {
    background: #ddd;
  }
  @media only screen and (max-width: 500px) {
    height: 2rem;
  }
`;

const TitleStyled = styled.label`
  position: absolute;
  height: 1rem;
  top: -0.7rem;
  left: 0.7rem;
  overflow: hidden;
  font-family: "Courier New", monospace;
  font-size: 0.9rem;
  padding: 0 0.5rem;
  border-top: solid 0.3rem ${colors.accent};
  border-radius: 0.5rem;
  background: ${({ disabled }) => (disabled === "disabled" ? "#ddd" : "white")};
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const Input = ({ children, ...rest }) => {
  return (
    <Field name={rest.name}>
      {({ field, meta }) => (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: rest.textarea ? "100%" : "auto",
          }}
        >
          {rest.textarea ? (
            <TextAreaStyled meta={meta} {...rest} {...field} />
          ) : (
            <InputStyled meta={meta} {...rest} {...field} />
          )}
          <TitleStyled disabled={rest.disabled}>{rest.title}</TitleStyled>
          {meta.touched && meta.error && (
            <div style={{ color: "red", height: "auto", fontWeight: "bold" }}>
              {meta.error}
            </div>
          )}
          {children}
        </div>
      )}
    </Field>
  );
};

export default Input;
