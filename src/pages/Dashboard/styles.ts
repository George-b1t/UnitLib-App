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

export const WhatsAppButton = styled.a`
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: #fff;
  border-radius: 50px;
  z-index: 1000;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    filter: brightness(0.9);
  }

  i {
    font-size: 30px;
  }
`;
