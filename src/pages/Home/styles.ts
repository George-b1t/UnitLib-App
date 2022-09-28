import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Welcome = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 80px;

  gap: 1rem;
`;

export const WelcomeTitle = styled.h1`
  padding: 0 10px;
  font-size: 25px;
  font-weight: 700;
  color: #fff;
`;
