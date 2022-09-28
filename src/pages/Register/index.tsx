import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FormEvent, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { AppContext } from "../../contexts/AppContext";
import { api } from "../../services/api";
import {
  BottomMessage,
  Container,
  Content,
  FormItem,
  RegisterForm,
} from "./styles";

function Register() {
  const { makeToast } = useContext(AppContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!name || !pass || !confirmPass) {
      return makeToast({
        type: "error",
        content: "Oops!",
        detail: "É necessário preencher todos os campos!",
      });
    }

    if (pass !== confirmPass) {
      return makeToast({
        type: "error",
        content: "Oops!",
        detail: "As senhas não coincidem!",
      });
    }

    setIsLoading(true);

    api
      .post("/user/create", {
        name,
        password: pass,
      })
      .then(() => {
        makeToast({
          type: "success",
          content: "Aee!",
          detail: "O usuário foi criado com sucesso!",
        });

        navigate("/login");
      })
      .catch(() => {
        makeToast({
          type: "error",
          content: "Oops!",
          detail: "Algo de errado ao tentar criar a conta!",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Container>
      <Header title="Criar conta" />
      <Content>
        <RegisterForm onSubmit={handleSubmit}>
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
          <FormItem>
            <label htmlFor="confirm-pass">Confirme a Senha</label>
            <span className="p-input-icon-left">
              <i className="pi pi-lock" />
              <InputText
                name="confirm-pass"
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Digite sua senha..."
                required
                style={{ width: "100%" }}
              />
            </span>
          </FormItem>

          <Button
            icon="pi pi-chevron-right"
            label="Criar conta"
            type="submit"
            loading={isLoading}
          />

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
