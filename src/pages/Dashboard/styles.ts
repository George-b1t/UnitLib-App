import styled from "styled-components";

export const Container = styled.div`
  p {
    color: #fff;
  }
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;

  gap: 2rem;

  margin: 0 10px;
  padding: 30px;
`;

export const Title = styled.h1`
  color: #fff;
  margin-bottom: 20px;
`;

export const FieldSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FieldInputSearch = styled.div`
  width: 100%;
  max-width: 700px;

  display: flex;
  flex-direction: column;

  h1 {
    margin-left: 10px;
  }

  input,
  span {
    width: 100%;
  }
`;

export const FilterPanelContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    gap: 0.5rem;
  }
`;
