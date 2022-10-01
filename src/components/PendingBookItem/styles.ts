import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1rem;

  &:not(:first-child) {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: -1rem;
      left: 0;
      width: 100%;
      height: 1px;
      background: #c8c8c8;
    }
  }

  background: #39485c;

  padding: 1rem;
  border-radius: 6px;

  gap: 2rem;
`;

export const FieldUpload = styled.div`
  display: flex;
  width: 100%;

  gap: 5%;

  div {
    width: 100%;
    max-width: 75%;

    > span {
      width: 100%;
    }
  }

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  input + label {
    font-size: 1.25em;
    font-weight: 700;
    display: inline-block;

    color: #ffffff;
    background: #6366f1;
    border: 1px solid #6366f1;
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s,
      box-shadow 0.2s;
    border-radius: 6px;

    &:hover {
      background: #4f46e5;
      color: #ffffff;
      border-color: #4f46e5;
    }

    cursor: pointer;
  }

  button {
    width: 20%;
  }
`;

export const Header = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1rem;

  h3 {
    color: #fff;
  }

  p {
    color: #c8c8c8;
    width: 100%;
    text-align: end;
  }
`;
