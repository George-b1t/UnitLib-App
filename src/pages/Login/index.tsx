import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { setUser } from "../../contexts/redux/slices/userSlice";
import { api } from "../../services/api";
import {
  BottomMessage,
  Container,
  Content,
  FormButton,
  FormItem,
  LoginForm,
} from "./styles";
import { setUserCookie } from "../../utils/UserCookies";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name || !pass) {
      return alert("Preencha todos os campos!");
    }

    api
      .post("/auth/login", {
        name,
        password: pass,
      })
      .then((res) => {
        const tempUser = res.data.user;
        const tempToken = res.data.token;

        const userData = {
          id: tempUser.id,
          name: tempUser.name,
          isAdm: tempUser.isAdm,
          token: tempToken,
        };

        setUserCookie(userData);

        dispatch(setUser(userData));

        navigate("/dashboard");
      });
  }

  return (
    <Container>
      <Header title="Login" />
      <Content>
        <LoginForm onSubmit={handleSubmit}>
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

          <FormButton type="submit">Enviar</FormButton>

          <BottomMessage>
            Ainda não tem uma conta?{" "}
            <NavLink to="/register" style={{ color: "#fff" }}>
              Criar conta
            </NavLink>
          </BottomMessage>
        </LoginForm>
      </Content>
    </Container>
  );
}

export { Login };
