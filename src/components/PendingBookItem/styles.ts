import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1rem;

  &:not(:first-child) {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: -1rem;
      left: 0;
      width: 100%;
      height: 1px;
      background: #c8c8c8;
    }
  }

  background: #39485c;

  padding: 1rem;
  border-radius: 6px;

  gap: 1rem;
`;

export const FieldUpload = styled.div`
  display: flex;
  width: 100%;

  gap: 5%;

  div {
    width: 100%;
    max-width: 75%;

    > span {
      width: 100%;
    }
  }

  button {
    width: 20%;
  }
`;

export const FieldUploadWithTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .5rem;
`

export const UploadTitle = styled.p`
  color: #fff;
  width: 100%;
  padding-left: 6px;
`;

export const Header = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 1rem;

  h3 {
    color: #fff;
  }

  p {
    color: #c8c8c8;
    width: 100%;
    text-align: end;
  }
`;
