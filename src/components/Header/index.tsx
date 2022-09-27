import { Container, Title } from "./styles";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

export { Header };
