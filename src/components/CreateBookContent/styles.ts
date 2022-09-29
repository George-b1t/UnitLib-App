import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  width: 100%;
`;

export const ModalForm = styled.form`
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
