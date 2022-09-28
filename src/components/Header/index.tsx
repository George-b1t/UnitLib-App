import { NavLink } from "react-router-dom";
import { Container, Logo, Separator, Title } from "./styles";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <Container>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <Logo>
          Unit<span>Lib</span>
        </Logo>
      </NavLink>
      <Separator />
      <Title>{title}</Title>
    </Container>
  );
}

export { Header };
