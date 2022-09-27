import { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import {
  BottomMessage,
  Container,
  Content,
  FormButton,
  FormItem,
  RegisterForm,
} from "./styles";

function Register() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name || !pass || !confirmPass) {
      return alert("Preencha todos os campos!");
    }

    if (pass !== confirmPass) {
      return alert("As senhas não coincidem!");
    }

    api
      .post("/user/create", {
        name,
        password: pass,
      })
      .then((res) => {
        alert("Criado com sucesso!");
      });
  }

  return (
    <Container>
      <Header title="Criar conta" />
      <Content>
        <RegisterForm onSubmit={handleSubmit}>
          <FormItem>
            <label htmlFor="name">Nome de usuário</label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome de usuário..."
              required
            />
          </FormItem>
          <FormItem>
            <label htmlFor="pass">Senha</label>
            <input
              name="pass"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Digite sua senha..."
              required
            />
          </FormItem>
          <FormItem>
            <label htmlFor="confirm-pass">Confirme a Senha</label>
            <input
              name="confirm-pass"
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Digite sua senha novamente..."
              required
            />
          </FormItem>

          <FormButton type="submit">Enviar</FormButton>

          <BottomMessage>
            Já tem uma conta?{" "}
            <NavLink to="/login" style={{ color: "#fff" }}>
              Fazer login
            </NavLink>
          </BottomMessage>
        </RegisterForm>
      </Content>
    </Container>
  );
}

export { Register };
