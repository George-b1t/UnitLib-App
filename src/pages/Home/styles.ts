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

  gap: 2rem;
`;

export const WelcomeTitle = styled.h1`
  font-weight: 700;
  color: #fff;
`;

export const WelcomeButton = styled.button`
  width: 400px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  font-weight: 600;

  border-radius: 2px;

  &:hover,
  &:focus {
    filter: brightness(0.8);
  }
`;
