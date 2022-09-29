import styled, { keyframes } from "styled-components";

interface BookProps {
  cape_url: string;
}

export const Container = styled.div<BookProps>`
  width: 150px;
  height: 190px;
  border-radius: 4px;
  background-color: #6366f1;

  cursor: pointer;

  background-image: url(${({ cape_url }) => cape_url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &:hover {
    div {
      height: 100%;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }
`;

export const Information = styled.div`
  height: 60px;
  width: 100%;
  background-color: #fff;
  border-radius: 0 0 4px 4px;

  transition: 0.5s ease;

  padding: 10px;

  p {
    color: #4d5158 !important;
  }

  p:nth-child(3) {
    margin-top: 10px;
    font-size: 13px;
  }

  strong {
    color: #20262e;
  }
`;
