import styled from "styled-components";

export const Container = styled.div`
  width: 150px;
  height: 190px;
  border-radius: 4px;
  background-color: #3f4b5b;

  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  i {
    position: absolute;
    top: calc(50% - 1rem);
    left: calc(50% - 1rem);
    font-size: 2rem;
    color: #c8c8c8;
    z-index: 1;
  }

  .p-skeleton {
    height: 100% !important;
  }

  &:hover {
    .BookItem-fieldInformation {
      height: 100%;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 0.85);
    }
  }
`;

export const Content = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Information = styled.div`
  height: 60px;
  width: 100%;
  background-color: #fff;
  border-radius: 0 0 4px 4px;

  transition: 0.5s ease;

  padding: 10px;

  z-index: 2;

  p {
    color: #4d5158 !important;
  }

  p:nth-child(3) {
    margin-top: 7px;
    font-size: 13px;
  }

  strong {
    color: #20262e;

    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
