import { Button } from "primereact/button";
import { NavLink } from "react-router-dom";
import { Header } from "../../components/Header";
import { Container, Content, Welcome, WelcomeTitle } from "./styles";

import {} from "pspdfkit";

function Home() {
  return (
    <Container>
      <Header title="Início" />
      <Content>
        <Welcome>
          <WelcomeTitle>Bem-vindo(a) ao UnitLib</WelcomeTitle>
          <NavLink style={{ textDecoration: "none" }} to="/login">
            <Button style={{ width: "100%" }} label="Fazer login" />
          </NavLink>
        </Welcome>
      </Content>
    </Container>
  );
}

export { Home };
