import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Loading = styled.div`
  margin-top: 1rem;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  width: 100%;
  max-width: 300px;

  > p {
    color: #fff;
  }
`;
