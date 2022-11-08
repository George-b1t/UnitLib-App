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
  width: 100%;

  gap: 0.5rem;

  label {
    color: #fff;
    font-weight: 600;
    margin-left: 6px;
  }

  > span {
    > div {
      width: 75%;

      > span {
        width: 100%;
      }
    }
  }
`;

export const FieldUpload = styled.div`
  display: flex;
  width: 100%;

  button {
    width: 20%;
  }
`;

export const RentInfo = styled.p`
  width: 100%;
  text-align: end;
`;
