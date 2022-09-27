import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  margin: 0 10px;
  padding: 30px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  width: 100%;
  max-width: 300px;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;

  label {
    color: #fff;
    font-weight: 600;
  }

  input {
    height: 30px;
    border-radius: 2px;
    background: transparent;
    color: #fff;

    padding: auto 4px;
    border-bottom: 1px solid transparent;

    font-weight: 400;
    font-size: 16px;

    transition: 0.1s ease;

    &:focus {
      border-bottom: 1px solid #fff;
    }
  }
`;

export const FormButton = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 2px;

  &:hover,
  &:focus {
    filter: brightness(0.8);
  }
`;

export const BottomMessage = styled.p`
  color: #fff;
  font-size: 14px;
`;
