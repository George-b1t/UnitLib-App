import { NavLink } from "react-router-dom";
import { Header } from "../../components/Header";
import {
  Container,
  Content,
  Welcome,
  WelcomeButton,
  WelcomeTitle,
} from "./styles";

function Home() {
  return (
    <Container>
      <Header title="Início" />
      <Content>
        <Welcome>
          <WelcomeTitle>Bem-vindo(a) ao UnitLib</WelcomeTitle>
          <NavLink style={{ textDecoration: "none" }} to="/login">
            <WelcomeButton>Fazer Login</WelcomeButton>
          </NavLink>
        </Welcome>
      </Content>
    </Container>
  );
}

export { Home };
