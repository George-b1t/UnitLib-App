import styled from "styled-components";

export const Container = styled.header`
  height: 80px;

  display: flex;
  align-items: center;

  margin: 0 10px;
  padding: 0 30px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

export const Title = styled.h2`
  color: #ffffff;
`;

export const Separator = styled.div`
  height: calc(100% - 30px);
  width: 1px;
  background-color: rgba(255, 255, 255, 0.5);

  margin: auto 20px;
`;

export const Logo = styled.h1`
  color: #fff;

  span {
    color: #6366f1;
  }
`;
