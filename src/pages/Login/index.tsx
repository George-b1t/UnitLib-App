import { FormEvent, useContext, useState } from "react";
import { InputText } from "primereact/inputtext";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { setUser } from "../../contexts/redux/slices/userSlice";
import { api } from "../../services/api";
import {
  BottomMessage,
  Container,
  Content,
  FormItem,
  LoginForm,
} from "./styles";
import { setUserCookie } from "../../utils/UserCookies";
import { Button } from "primereact/button";
import { AppContext } from "../../contexts/AppContext";

function Login() {
  const { makeToast } = useContext(AppContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name || !pass) {
      return makeToast({
        type: "error",
        content: "Oops!",
        detail: "É necessário preencher todos os campos!",
      });
    }

    setIsLoading(true);

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

        makeToast({
          type: "success",
          content: "Aee!",
          detail: "Login realizado com sucesso!",
        });

        navigate("/dashboard");
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar fazer login!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Container>
      <Header title="Login" />
      <Content>
        <LoginForm onSubmit={handleSubmit}>
          <FormItem>
            <label htmlFor="name">Nome de usuário</label>
            <span className="p-input-icon-left">
              <i className="pi pi-user" />
              <InputText
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome de usuário..."
                required
                style={{ width: "100%" }}
              />
            </span>
          </FormItem>
          <FormItem>
            <label htmlFor="pass">Senha</label>
            <span className="p-input-icon-left">
              <i className="pi pi-lock" />
              <InputText
                name="pass"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Digite sua senha..."
                required
                style={{ width: "100%" }}
              />
            </span>
          </FormItem>

          <Button
            icon="pi pi-sign-in"
            label="Entrar"
            type="submit"
            loading={isLoading}
          />

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
