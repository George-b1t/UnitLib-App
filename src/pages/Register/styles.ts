import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  margin: 0 10px;
  padding: 30px;
`;

export const RegisterForm = styled.form`
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
    margin-left: 6px;
  }
`;

export const BottomMessage = styled.p`
  color: #fff;
  font-size: 14px;
`;
